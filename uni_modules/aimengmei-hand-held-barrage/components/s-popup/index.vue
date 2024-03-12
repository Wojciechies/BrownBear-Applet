<template>
  <div
    :class="['s-popup',customClass,position?'s-popup-position-'+position:'',{'s-popup-effect':effectStatus}]"
    :style="styleZindex+styleDisplay+styleDuration"
  >
    <template v-if="mask">
      <div
        class="s-popup-mask"
        :style="'background-color: rgba(0, 0, 0, '+maskOpacity+');'"
        @touchmove.stop.prevent="e=>e.preventDefault()"
        @click="maskClose && hide()"
      ></div>
    </template>
    <div
      v-if="preventTouchmove"
      class="s-popup-wrapper"
      @touchmove.stop.prevent="e=>e.preventDefault()"
    >
      <slot></slot>
    </div>
    <div v-else class="s-popup-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>

const zIndexObj = {}
const getMaxZindex = () => {
  return Math.max(2000, ...Object.keys(zIndexObj).map(k => parseInt(zIndexObj[k] || 0))) + 1
}

export default {
  name: 'SPopup',
  props: {
    // class
    customClass: {
      type: String,
      default: ''
    },
    // v-model双向绑定
    value: Boolean,
    // 弹框显示位置 center | left | right | top | bottom
    position: {
      type: String,
      default: 'center'
    },
    // 是否使用过渡效果
    effect: {
      type: Boolean,
      default: true
    },
    // 过渡时间
    effectDuration: {
      type: Number,
      default: 300
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },
    // 遮罩透明度
    maskOpacity: {
      type: Number,
      default: 0.7
    },
    // 点击遮罩是否关闭弹框
    maskClose: {
      type: Boolean,
      default: true
    },
    // 自动关闭时间
    duration: {
      type: Number,
      default: 0
    },
    // 是否阻止弹层touchmove滚动，手机上滚动穿透
    preventTouchmove: {
      type: Boolean,
      default: false
    },
    // 显示时拦截钩子返回promise拦截
    beforeShow: Function,
    // 隐藏时拦截钩子返回promise拦截
    beforeHide: Function
  },
  data() {
    Object.assign(this, {
      popupId: 's-popup-' + Math.random().toString(36).substr(2),
      visibleId: 0,
      visibleStatus: false,
      effectTimeoutId: 0,
      effectDurationTimeoutId: 0,
      autoCloseTimeoutId: 0
    })
    return {
      styleZindex: '',
      styleDisplay: '',
      styleDuration: '',
      effectStatus: false
    }
  },
  watch: {
    value() {
      this.updateVisible()
    }
  },
  mounted() {
    this.updateVisible()
  },
  beforeDestroy() {
    this.destroy()
  },
  methods: {
    async show() {
      if (!this.visibleStatus) {
        this.visibleId++
        let status = true
        const nowId = this.visibleId
        if (this.beforeShow) {
          try {
            await this.beforeShow()
          } catch (error) {
            status = false
          }
        }
        if (nowId === this.visibleId) {
          if (status) {
            const effectDuration = this.effect ? this.effectDuration : 0
            this.visibleStatus = true
            this.$emit('input', true)
            zIndexObj[this.popupId] = getMaxZindex()
            this.styleZindex = `z-index:${zIndexObj[this.popupId]};`
            this.styleDuration = `transition-duration:${effectDuration}ms;`
            this.styleDisplay = 'display:block;'
            clearTimeout(this.effectTimeoutId)
            clearTimeout(this.effectDurationTimeoutId)
            this.$nextTick(() => {
              this.effectTimeoutId = setTimeout(() => {
                this.effectStatus = true
                this.effectDurationTimeoutId = setTimeout(() => {
                  this.styleDuration = ''
                  if (this.visibleStatus) {
                    this.$emit('show')
                    // 自动关闭
                    const duration = parseInt(this.duration)
                    if (duration > 0) {
                      clearTimeout(this.autoCloseTimeoutId)
                      this.autoCloseTimeoutId = setTimeout(() => {
                        this.visibleStatus && this.hide()
                      }, duration)
                    }
                  }
                }, effectDuration)
              }, 50)
            })
          } else {
            this.$emit('input', false)
          }
        }
      }
    },
    async hide() {
      if (this.visibleStatus) {
        this.visibleId++
        let status = true
        const nowId = this.visibleId
        if (this.beforeHide) {
          try {
            await this.beforeHide()
          } catch (error) {
            status = false
          }
        }
        if (nowId === this.visibleId) {
          if (status) {
            const effectDuration = this.effect ? this.effectDuration : 0
            this.visibleStatus = false
            this.$emit('input', false)
            this.styleDuration = 'transition-duration:' + effectDuration + 'ms;'
            clearTimeout(this.autoCloseTimeoutId)
            clearTimeout(this.effectTimeoutId)
            clearTimeout(this.effectDurationTimeoutId)
            this.$nextTick(() => {
              this.effectTimeoutId = setTimeout(() => {
                this.effectStatus = false
                this.effectDurationTimeoutId = setTimeout(() => {
                  this.styleDisplay = ''
                  this.styleZindex = ''
                  this.styleDuration = ''
                  delete zIndexObj[this.popupId]
                  if (!this.visibleStatus) {
                    this.$emit('hide')
                  }
                }, effectDuration)
              }, 50)
            })
          } else {
            this.$emit('input', true)
          }
        }
      }
    },
    updateVisible() {
      // this.$nextTick(() => {
      setTimeout(() => {
        if (this.visibleStatus !== this.value) {
          this[this.value ? 'show' : 'hide']()
        }
      }, 0)
      // });
    },
    destroy() {
      this.visibleId = 0
      this.visibleStatus = false
      this.animate = false
      this.styleDisplay = ''
      this.styleZindex = ''
      this.styleDuration = ''
      delete zIndexObj[this.popupId]
      clearTimeout(this.effectTimeoutId)
      clearTimeout(this.effectDurationTimeoutId)
      clearTimeout(this.autoCloseTimeoutId)
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss">
.s-popup {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  pointer-events: none;

  .s-popup-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: 9999;
    pointer-events: auto;
  }

  .s-popup-wrapper {
    position: absolute;
    max-width: 100%;
    // max-height: 80%;
    z-index: 99999;
    pointer-events: auto;
    // background-color: white;
    // overflow: auto;
  }
  //弹框效果
  .s-popup-mask,
  .s-popup-wrapper {
    transition-duration: inherit;
  }

  &.s-popup-effect {
    .s-popup-mask {
      opacity: 1;
    }
  }
}
//center
.s-popup-position-center {
  .s-popup-wrapper {
    left: 50%;
    top: 50%;
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  &.s-popup-effect {
    .s-popup-wrapper {
      opacity: 1;
      transform: translate3d(-50%, -50%, 0) scale(1);
    }
  }
}
//top
.s-popup-position-top {
  .s-popup-wrapper {
    left: 0;
    right: 0;
    top: 0;
    transform: translateY(-100%);
  }
  &.s-popup-effect {
    .s-popup-wrapper {
      transform: translateY(0);
    }
  }
}
//bottom
.s-popup-position-bottom {
  .s-popup-wrapper {
    left: 0;
    right: 0;
    bottom: 0;
    transform: translateY(100%);
  }
  &.s-popup-effect {
    .s-popup-wrapper {
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
      transform: translateY(0);
    }
  }
}
//从左侧滑入
.s-popup-position-left {
  .s-popup-wrapper {
    left: 0;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
  }
  &.s-popup-effect {
    .s-popup-wrapper {
      transform: translateX(0);
    }
  }
} //从右侧滑入
.s-popup-position-right {
  .s-popup-wrapper {
    right: 0;
    top: 0;
    bottom: 0;
    transform: translateX(100%);
  }
  &.s-popup-effect {
    .s-popup-wrapper {
      transform: translateX(0);
    }
  }
}
</style>
