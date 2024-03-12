<template>
  <view class="config-model">
    <view class="btns-box">
      <view class="complete" @click="$emit('hide')">完成</view>
    </view>

    <scroll-view class="scroll-view" scroll-y="true">

      <view class="item">
        <view class="item-left">特效:</view>
        <view class="item-right">
          <view class="item-right__content flex-center">
            <scroll-view scroll-x="true" class="effect-cards">
              <view v-for="(item, index) in effectList" :key="index" class="effect-cards__item" :class="{ 'style-checked': config.effect[item] }" :style="{ 'font-weight': item === 'bold' ? 'bold' : 'normal', 'text-shadow': item === 'shadow' ? `0 0 20px ${config.textColor}` : item === 'shake' ? '2px -2px 0px #FE008E, -2px 2px 0px #00FFFF;' : '', 'text-decoration': item === 'scribe' ? 'line-through' : '' }" @click="$emit('changeConfigEffect', item)">Aa</view>
            </scroll-view>
          </view>
        </view>
      </view>

      <view class="item">
        <view class="item-left">滚动字幕:</view>
        <view class="item-right">
          <view class="item-right__content">
            <switch class="tag-switch" type="switch" :checked="config.move" color="var(--global-color-100)" @change="changeConfig($event, 'move')" />
          </view>
        </view>
      </view>

      <view v-if="config.move" class="item">
        <view class="item-left">滚动速度:</view>
        <view class="item-right">
          <view class="item-right__content">
            <slider class="tag-slider" :value="config.aniSpeed" show-value min="1" max="10" active-color="var(--global-color-100)" :block-size="18" @change="changeConfig($event, 'aniSpeed')" />
          </view>
        </view>
      </view>

      <view class="item">
        <view class="item-left">文字大小:</view>
        <view class="item-right">
          <view class="item-right__content">
            <slider class="tag-slider" :value="config.textSize" show-value min="10" max="50" active-color="var(--global-color-100)" :block-size="18" @change="changeConfig($event, 'textSize')" />
          </view>
        </view>
      </view>

      <view class="item">
        <view class="item-left">文字间距:</view>
        <view class="item-right">
          <view class="item-right__content">
            <slider class="tag-slider" :value="config.margin" show-value min="0" max="30" active-color="var(--global-color-100)" :block-size="18" @change="changeConfig($event, 'margin')" />
          </view>
        </view>
      </view>

      <view class="item">
        <view class="item-left">文字颜色:</view>
        <view class="item-right">
          <view class="item-right__content flex-center">
            <scroll-view scroll-x="true" class="color-cards">
              <view v-for="(item, index) in defaultTextColors" :key="index" class="color-cards__item" :class="{ 'style-checked': item === config.textColor }" :style="{ 'background-color': item }" @click="$emit('changeConfig', 'textColor', item)"></view>
            </scroll-view>
          </view>
        </view>
      </view>

      <view class="item">
        <view class="item-left">背景颜色:</view>
        <view class="item-right">
          <view class="item-right__content flex-center">
            <scroll-view scroll-x="true" class="color-cards">
              <view v-for="(item, index) in defaultBgColors" :key="index" class="color-cards__item" :class="{ 'style-checked': item === config.bgColor }" :style="{ 'background-color': item }" @click="$emit('changeConfig', 'bgColor', item)"></view>
            </scroll-view>
          </view>
        </view>
      </view>

    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 'HandHeldBarrageConfigModel',
  props: {
    // 当前配置
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      effectList: ['bold', 'shadow', 'solid', 'shake', 'scribe'], // 特效
      defaultTextColors: ['rgba(255, 255, 255, 1)', 'rgba(0, 0, 0, 1)', 'rgba(254, 0, 113, 1)', 'rgba(254, 0, 12, 1)', 'rgba(255, 83, 0, 1)', 'rgba(255, 226, 0, 1)', 'rgba(0, 255, 39, 1)', 'rgba(0, 159, 254, 1)', 'rgba(0, 255, 200, 1)', 'rgba(133, 0, 254, 1)'],
      defaultBgColors: ['rgba(0, 0, 0, 1)', 'rgba(255, 255, 255, 1)', 'rgba(254, 0, 113, 1)', 'rgba(254, 0, 12, 1)', 'rgba(255, 83, 0, 1)', 'rgba(255, 226, 0, 1)', 'rgba(0, 255, 39, 1)', 'rgba(0, 159, 254, 1)', 'rgba(0, 255, 200, 1)', 'rgba(133, 0, 254, 1)']
    }
  },
  methods: {
    // 修改裁剪框配置
    changeConfig(event, key) {
      const value = ['move'].includes(key) ? event.target.value : +event.target.value
      this.$emit('changeConfig', key, value)
    }
  }
}
</script>

<style lang="scss" scoped>
	
	// flex元素内部垂直水平居中
	@mixin flex-center() {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}

  .config-model {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 50vh;
    padding: 24rpx;
    box-sizing: border-box;

    .btns-box {
      display: flex;
      justify-content: space-between;
      height: 100rpx;

      .send {
        @include flex-center();
        width: 240rpx;
        height: 60rpx;
        border-radius: 12rpx;
        color: var(--global-color-100);
        border: 1px solid var(--global-color-100);
        background-color: rgba(255, 255, 255, 0.1);
      }

      .complete {
        @include flex-center();
        width: 120rpx;
        height: 60rpx;
        border-radius: 12rpx;
        font-size: $uni-font-size-base;
        color: #FFF;
        background-color: var(--global-color-100);
      }
    }
  }

	.scroll-view {
    width: 100%;
    height: calc(100% - 100rpx);
  }

  .item {
    display: flex;
    align-items: center;
    word-break: break-all;
    margin: 40rpx 0 60rpx;
    font-size: $uni-font-size-base;

    .item-left {
      min-width: 150rpx;
      max-width: 150rpx;
      color: #FFF;
      display: flex;
      align-items: center;
    }

    .item-right {
      width: calc(100% - 150rpx);
      box-sizing: border-box;
      color: $uni-color-paragraph;

      &__content {

        .effect-cards {
          width: 100%;
          display: flex;
          white-space: nowrap;

          &__item {
            display: inline-block;
            margin-right: 20rpx;
            width: 70rpx;
            height: 70rpx;
            border-radius: 50%;
            color: #FFF;
            text-align: center;
            line-height: 70rpx;
            background-color: #333;
            font-size: $uni-font-size-sm;
          }
        }

        .slider {
          margin: 0 0 14rpx;
        }

        .tag-slider {
          margin: 0;
        }

        .tag-switch {
          justify-self: flex-start;
          transform: scale(0.8);
        }

        .radio-group {
          display: flex;

          margin: 0 0 14rpx;

          &__item {
            display: flex;
            align-items: center;
            min-width: 25%;

            .radio {
              transform: scale(0.75);
            }
          }
        }

        .space-between {
          justify-content: space-between;
        }

        .color-cards {
          width: 100%;
          display: flex;
          white-space: nowrap;

          &__item {
            display: inline-block;
            margin-right: 20rpx;
            width: 60rpx;
            height: 60rpx;
            border-radius: 50%;
          }
        }

        .style-checked {
          border: 1px solid #FFF;
          box-sizing: border-box
        }

      }

      .flex-center {
        @include flex-center();
      }

      &__tips {
        font-size: 22upx;
        color: #999;
        word-break: break-all;
        margin-bottom: 40rpx;
      }

      &__title {
        margin: 30rpx 0;
        font-size: $uni-font-size-base;
        color: $uni-color-subtitle;
      }

    }
  }
</style>
