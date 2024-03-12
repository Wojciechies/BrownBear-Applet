<template>
	<view class="content">
		<view style="height: 30%;width: 100%;background-color: #FFFFFF;">
			<image style="width: 100%;height: 100%" src="/static/images/mine-background.svg" mode="scaleToFill"></image>
		</view>
		<view class="itemcontent">
			<u-cell-group :border="false">
				<u-cell title="关于我们" :isLink="true" url="/pages/mine/about/about">
					<u-icon slot="icon" size="32" name="order" color="#43CF7C"></u-icon>
				</u-cell>
				<button openType="contact">
					<u-cell title="在线客服" :isLink="true">
						<u-icon slot="icon" size="32" name="chat" color="#FFC300"></u-icon>
					</u-cell>
				</button>
				<u-cell title="特别感谢" :isLink="true" url="/pages/mine/thanks/thanks">
					<u-icon slot="icon" size="32" name="heart" color="#E33C64"></u-icon>
				</u-cell>
				<button openType="feedback">
					<u-cell title="反馈" :isLink="true">
						<u-icon slot="icon" size="32" name="edit-pen" color="#3C9CFF"></u-icon>
					</u-cell>
				</button>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			//获取本地token
			// const token = uni.getStorageSync('uni_id_token');
			// const tokenExpired = uni.getStorageSync('uni_id_token_expired');
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		height: 100%;
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
		/* 		padding: 5%; */
	}

	.login {
		margin-left: 15%;
		background-color: #FFFFFF;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		justify-content: center;
		align-items: center;
		display: flex;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	button::after {
		border: none;
	}

	button {
		position: relative;
		display: block;
		margin-left: auto;
		margin-right: auto;
		padding-left: 0px;
		padding-right: 0px;
		box-sizing: border-box;
		// font-size: 18px;
		text-align: left;
		text-decoration: none;
		// line-height: 1;
		line-height: 1.35;
		// border-radius: 5px;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		color: #000000;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}

	.button-hover {
		color: rgba(0, 0, 0, 0.6);
		background-color: rgb(235, 237, 238);
		border-radius: 0px;
	}
</style>
