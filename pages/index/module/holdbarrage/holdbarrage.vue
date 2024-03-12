<!-- 手持弹幕 -->
<template>
  <view class="warp" :style="themeStyleVar">
    <view class="content" :style="{ 'background-color': config.bgColor }" @click="touchContent">
      <view class="barrage-text" :style="barrageTextStyle"><view :class="{ 'ani-move': config.move }" :style="{ 'width': `${aniBoxWidth}rpx`, 'animation-duration': `${aniTime}s` }">{{ config.barrageText }}</view></view>
    </view>

    <i v-if="!fullScreen" class="iconfont icon-suo lock" :class="{ 'icon-suo1': lock }" :style="{ color: lock ? config.textColor : '#333' }" @click="changeLock"></i>
    <view v-if="!fullScreen && !lock" class="footer">
      <i class="iconfont icon-suo v-hide"></i>
      <input v-model="config.barrageText" class="tag-input" type="text">
      <i class="iconfont icon-shezhi" @click="showConfigModel(true)"></i>
    </view>

    <!-- 配置组件弹窗开始 -->
    <s-popup v-model="visibleConfigModel" position="bottom" :mask-opacity="0" :prevent-touchmove="true" @hide="showConfigModel(false)">
      <config-model :config="config" @changeConfig="changeConfig" @hide="showConfigModel(false)" @changeConfigEffect="changeConfigEffect"></config-model>
    </s-popup>
    <!-- 弹窗结束 -->
  </view>
</template>

<script>
import SPopup from '@/uni_modules/aimengmei-hand-held-barrage/components/s-popup/index.vue'
import ConfigModel from '@/uni_modules/aimengmei-hand-held-barrage/components/config-model/index.vue' // 配置组件

export default {
  components: {
    SPopup,
    ConfigModel
  },
  data() {
    return {
      lock: false, // 锁
      fullScreen: false, // 是否全屏展示
      config: { // 弹幕样式配置
        barrageText: '手持弹幕',
        effect: { // 特效
          bold: true, // 加粗
          shadow: false, // 阴影
          solid: false, // 立体
          shake: false, // 抖动
          scribe: false // 划线
        },
        textColor: 'rgba(255, 255, 255, 1)', // 文字颜色
        bgColor: 'rgba(0, 0, 0, 1)', // 背景色
        move: true, // 文字是否开启滚动
        textSize: 20, // 文字大小
        margin: 5, // 文字间距
        aniSpeed: 5 // 滚动速度
      },
      timer: null,
      visibleConfigModel: false, // 是否展示配置组件
			themeStyle: {
			  '--global-color-100': 'rgb(26, 115, 232)', // 主色
			  '--global-color-200': 'rgb(138, 180, 248)', // 辅色
			  '--global-color-300': 'rgb(210, 227, 252)', // 选项选中背景主色
			  '--global-color-400': 'rgb(239, 244, 252)', // 蒙层
			  '--global-color-500': 'rgb(0, 0, 0)' // 文字主色
			}
    }
  },
  computed: {
    navBarConf() { return this.$store.getters.getNavBarConf }, // 获取设备头部安全区和标题高度
    themeStyleVar() { // 当前主题色卡变量
			const themeStyle = this.themeStyle
			let themeStyleVar = ''
			for (const key in themeStyle) {
			  themeStyleVar += `${key}: ${themeStyle[key]};`
			}
			return themeStyleVar
		},
    // 字幕宽度
    aniBoxWidth() {
      const barrageText = this.config.barrageText
      const textLen = JSON.stringify(barrageText).length
      const fontW = Number(this.config.textSize) * 9
      const spacW = Number(this.config.margin) * 10
      const width = (fontW + spacW) * textLen
      uni.showToast({
        title: width,
        icon: 'none'
      })
      return width
    },
    // 循环时间，滚动一轮需要的时间
    aniTime() { return Number(this.aniBoxWidth) / 50 / this.config.aniSpeed },
    // 处理文字阴影及立体效果
    effectShadow() {
      const textColors = this.config.textColor.replace(/([rgba\(\)])/g, '').split(',')
      const shadowColor = `rgba(${textColors[0]}, ${textColors[1]}, ${textColors[2]}, 0.3)`
      let str = this.config.effect.shadow ? `0 0 20px ${this.config.textColor}` : `0 0 0px ${shadowColor}`
      if (this.config.effect.solid) {
        for (let i = 1; i <= 8; i++) {
          str += `, ${i}px -${i}px 0 ${shadowColor}`
        }
      }
      return str
    },
    // 字幕style
    barrageTextStyle() {
      let styleStr = ''
      // 文字颜色
      styleStr += `color: ${this.config.textColor};`
      // 文字大小
      styleStr += `font-size: ${this.config.textSize * 10}rpx;`
      // 间距
      styleStr += `letter-spacing: ${this.config.margin * 10}rpx;`
      // 加粗
      styleStr += `font-weight: ${this.config.effect.bold ? 'bold' : 'normal'};`
      // 阴影
      if (this.config.effect.shadow || this.config.effect.solid) { styleStr += `text-shadow: ${this.effectShadow};` }
      // 划线
      if (this.config.effect.scribe) { styleStr += `text-decoration: line-through;` }
      // 抖动
      if (!this.config.effect.shake) { styleStr += `animation: none;` }

      return styleStr
    }
  },
  watch: {
    // 锁住时锁展示会在2秒后隐藏
    fullScreen(value) {
      if (this.lock === true && value === false) { this.autoFull() }
    }
  },
  onLoad(option) { // 页面初次加载

  },
  methods: {
    // 触摸屏幕
    touchContent() { this.fullScreen = !this.fullScreen },
    // 修改锁定状态
    changeLock() {
      this.lock = !this.lock
      // 锁定将全屏
      if (this.lock) { this.autoFull() }
      // 解锁清除自动全屏
      if (!this.lock) { this.timer && clearTimeout(this.timer) }
    },
    // 自动全屏
    autoFull() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.fullScreen = true
      }, 2e3)
    },
    // 修改美化组件展示状态
    showConfigModel(status = true) { this.visibleConfigModel = status },
    // 特效
    changeConfigEffect(key) { this.config.effect[key] = !this.config.effect[key] },
    // 修改config中对应的值
    changeConfig(key, value) { this.config[key] = value },
    // 获取保存的配置
    async getConfig(id) {
      uni.showLoading({
        title: '配置同步中...',
        mask: true
      })

      const db = uniCloud.database()
      const collection = db.collection('barrage-config')
      const { result } = await collection.where({ _id: id }).get()

      if (result.data && result.data[0]) {
        this.config = result.data[0].config

        // 默认锁定
        this.lock = true
        // 默认全屏
        this.fullScreen = true
      }

      uni.hideLoading()
    }
  }
}
</script>

<style lang="scss" scoped>
	
	// 垂直水平居中
	@mixin trans-center() {
	  position: absolute;
	  top: 50%;
	  left: 50%;
	  transform: translate(-50%, -50%);
	}

  .warp {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .content {
    @include trans-center();
    width: 100vw;
    height: 100vh;

    .barrage-text {
      min-width: 100vh;
      height: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      transform-origin: 50vw 50vw;
      transform: rotate(90deg);
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
      animation: textShake 0.5s linear infinite;

      .ani-move {
        animation: textMove 5s linear infinite;
        animation-fill-mode: forwards;
      }
    }
  }

  /*文字无缝滚动*/
  @keyframes textMove {
    0%{transform: translateX(100%);}
    100%{transform: translateX(-100%);}
  }

  /*文字无缝滚动*/
  @keyframes textShake {
    0%, 33% { text-shadow: 3px -3px 0px #FE008E, -5px 5px 0px #00FFFF; }
    34%, 66% { text-shadow: 5px -5px 0px #FE008E, -3px 3px 0px #00FFFF; }
    67%, 100% { text-shadow: 3px -3px 0px #00FFFF, -5px 5px 0px #FE008E; }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    width: 100%;
    height: 100rpx;
    z-index: 22;

    .tag-input {
      width: calc(100% - 200rpx);
      height: 60rpx;
      margin: 20rpx 0;
      padding: 0 20rpx;
      border-radius: 12rpx;
      background-color: #F1F1F1;
      box-sizing: border-box;
      color: #333;
    }

  }

  .iconfont {
    width: 80rpx;
    height: 80rpx;
    margin: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 45rpx;
    color: #333;
  }

  .lock {
    position: fixed;
    left: 0;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    z-index: 33;
  }

</style>

<style lang="scss" scoped>
	@font-face {font-family: "iconfont";
	  src: url('//at.alicdn.com/t/font_2414485_kjpn7n9k2ja.eot?t=1617262983275'); /* IE9 */
	  src: url('//at.alicdn.com/t/font_2414485_kjpn7n9k2ja.eot?t=1617262983275#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
	  url('//at.alicdn.com/t/font_2414485_kjpn7n9k2ja.woff?t=1617262983275') format('woff'),
	  url('//at.alicdn.com/t/font_2414485_kjpn7n9k2ja.ttf?t=1617262983275') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('//at.alicdn.com/t/font_2414485_kjpn7n9k2ja.svg?t=1617262983275#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-tianjia:before {
	  content: "\e624";
	}
	
	.icon-gif:before {
	  content: "\e684";
	}
	
	.icon-icontz:before {
	  content: "\e60c";
	}
	
	.icon-fenzu:before {
	  content: "\e620";
	}
	
	.icon-shezhi:before {
	  content: "\e611";
	}
	
	.icon-suo:before {
	  content: "\e657";
	}
	
	.icon-suo1:before {
	  content: "\e623";
	}
	
	.icon-yanse:before {
	  content: "\e61c";
	}
	
	.icon-xiguan:before {
	  content: "\e6f1";
	}
	
	.icon-caijian1:before {
	  content: "\e63b";
	}
	
	.icon-danmu:before {
	  content: "\e6e8";
	}
	
	.icon-fenxiang:before {
	  content: "\e61d";
	}
	
	.icon-kefu:before {
	  content: "\eeb4";
	}
	
	.icon-shangchuan:before {
	  content: "\e7ad";
	}
	
	.icon-guanbi:before {
	  content: "\e61b";
	}
	
	.icon-zhongxinshengchengchushimima:before {
	  content: "\e615";
	}
	
	.icon-mokuaishengchengqi:before {
	  content: "\e638";
	}
	
	.icon-jifen:before {
	  content: "\e61a";
	}
	
	.icon-zhishiku:before {
	  content: "\e621";
	}
	
	.icon-saoma:before {
	  content: "\e622";
	}
	
	.icon-fanhui:before {
	  content: "\e62b";
	}
	
	.icon-gongju:before {
	  content: "\e647";
	}
	
	.icon-wode:before {
	  content: "\e7b8";
	}
	
	.icon-rmb-full:before {
	  content: "\e8c4";
	}
	
	.icon-tiaoxingma:before {
	  content: "\e627";
	}
	
	.icon-erweima:before {
	  content: "\e69a";
	}
	
	.icon-weibiaoti--:before {
	  content: "\e626";
	}
	
</style>
