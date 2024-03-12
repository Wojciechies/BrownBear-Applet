<template>
	<view class="content">
		<view style="margin-top: 2%;margin: 2%;">
			<u-swiper :list="swiperItemList" height="150" indicator circular :autoplay="true" radius="5"
				bgColor="#ffffff">
			</u-swiper>
		</view>
		<view v-if="notice.show" style="margin: 2%;">
			<u-notice-bar :text="notice.content" direction="column" bgColor="#87CEFA" color="#ffffff"></u-notice-bar>
		</view>
		<view class="itemcontent">
			<u-skeleton rows="3" rowsHeight="35" :title="false" :loading="loading">
				<u-grid :border="false" @click="click" col="4">
					<u-grid-item customStyle="paddingTop:2%" v-for="(srcListItem,srcListIndex) in gridItemList"
						:key="srcListIndex">
						<image :src="srcListItem.icon" shape="circle" style="width: 35px;height: 35px;"></image>
						<text style="font-size: 14px;">{{srcListItem.title}}</text>
					</u-grid-item>
				</u-grid>
			</u-skeleton>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	const uniIdCo = uniCloud.importObject('uni-id-co', {
		customUI: true
	})
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				swiperItemList: [
					'/static/images/swiper1.png',
					'/static/images/swiper2.png',
					'/static/images/swiper3.png',
				],
				gridItemList: [
					{
						"icon": '/static/images/art.svg',
						"url": '/pages/index/module/signature/signature',
						"title": "电子签名",
						"permission": true //使用无限制
					},
					{
						"icon": '/static/images/holdbarrage.svg',
						"url": '/pages/index/module/holdbarrage/holdbarrage',
						"title": "手持弹幕",
						"permission": true
					},
					{
						"icon": '/static/images/clock.svg',
						"url": '/pages/index/module/clock/clock',
						"title": "翻页时钟",
						"permission": true
					},
					{
						"icon": '/static/images/qrcode.svg',
						"url": '/pages/index/module/qrcode/qrcode',
						"title": "二维码",
						"permission": true
					}
				],
				notice: {},
				modal: {
					modalContent: "功能正在维护,请耐心等待"
				},
				loading: true

			}
		},
		// onShareAppMessage() {

		// },
		onReady() {

		},
		onLoad() {
			//获取首页宫格选项
			const that = this;
			uniCloud.callFunction({
					name: 'PageOptions',
					data: {},
				})
				.then(res => {
					that.gridItemList = res.result.gridItemList
					that.swiperItemList = res.result.swiperItemList
					that.notice = res.result.notice
					that.modal = res.result.modal
					that.$nextTick(function() {
						that.loading = false
					});
				});

			that.$nextTick(function() {
				that.loading = false
			});

			//获取token和token过期时间
			const token = uni.getStorageSync('uni_id_token');
			const tokenExpired = uni.getStorageSync('uni_id_token_expired');
			const openid = uni.getStorageSync('openid');
			const timeStamp = new Date().getTime()
			if (tokenExpired == '' || tokenExpired == undefined || timeStamp >= tokenExpired) {
				//不存在token则登陆
				// if (token == '' || token == undefined) {
				// 	that.Login()
				// }
				//存在token则更新过期token
				// that.CheckToken()

				//token过期重新登陆
				that.Login()
			}

			if (openid === null || openid === undefined || openid ==='') {
				that.GetOpenId()
			}

		},
		methods: {
			//点击宫格选项
			click(index) {
				// this.$refs.uToast.show({
				// 	type: 'default',
				// 	title: '默认主题',
				// 	message: "锦瑟无端五十弦",
				// });
				const that = this;
				if (this.gridItemList[index].permission == true) {
					this.showModal = false

					if (this.gridItemList[index].click != null && this.gridItemList[index].click != undefined) {
						this.callFunctionByName(this.gridItemList[index].click)
					} else {
						uni.navigateTo({
							url: that.gridItemList[index].url
						});
					}
				} else {
					this.showModal = true
					uni.showModal({
						title: '温馨提示',
						content: this.modal.modalContent,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			callFunctionByName(functionName) {
				let methods = this.$options.methods
				const that = this
				methods[functionName](that)
			},
			Login() {
				const that = this;
				//获取code
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log('-------响应(uni.login)------', loginRes)
						// uni.setStorageSync('openid',loginRes)
						// const openid = uni.getStorageSync('openid');
						//登陆
						uniIdCo.loginByWeixin({
							code: loginRes.code
						}).then(e => {
							//登陆成功自动存储token
							console.log('success', e);

						}).catch(e => {
							console.log('fail', e);

						}).finally(e => {

						})

					},
					fail: function(err) {
						uni.showToast({
							icon: 'none',
							title: '授权失败'
						})
					}
				});
			},
			//根据Token换取uid
			// async CheckToken() {
			// 	await uniCloud.callFunction({
			// 			name: 'User',
			// 			data: {
			// 				action: 'checkToken',
			// 				params: {

			// 				}
			// 			},
			// 		})
			// 		.then(res => {
			// 			console.log('验证Token', res)
			// 			//修改vuex状态
			// 			if (res.result.code == 0) {
			// 				//获取用户信息
			// 				// this.openid = res.result.openid

			// 			}
			// 		});
			// },
			/**
			 * 获取openid并存储本地
			 */
			GetOpenId() {
				const that = this
				//获取code
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						console.log('-------响应(uni.login)------', loginRes)
						
						uniCloud.callFunction({
							name: 'User',
							data: {
								action: "GetOpenId",
								params: {
									loginCode: loginRes.code
								}
							},
							success: (res) => {
								uni.setStorageSync('openid', res.result.data.openid)
							}
						});
					},
					fail: function(err) {
						// uni.showToast({
						// 	icon: 'none',
						// 	title: '授权失败'
						// })
					}
				});
			}
		}
	}
</script>

<style>
	page {
		/* 		height: 100%; */
		background-color: #F5F5F5;
	}

	.content {
		width: 100%;
		height: 100%;
		background-color: #F5F5F5;
	}

	.itemcontent {
		margin: 2%;
		background-color: #FFFFFF;
		border-radius: 10px;
		height: 60%;
		padding: 5%;
	}
</style>
