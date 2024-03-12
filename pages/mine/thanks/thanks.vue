<template>
	<view class="content">
		<view class="itemcontent">
			<u--text text="uView UI"></u--text>
			<u--text ref="uView" type="primary" text="https://github.com/umicro/uView2.0" @click="copy"></u--text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			
		},
		methods: {
			copy() {
				var content=this.$refs.uView.text;
				uni.setClipboardData({
					data: content,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
				 		    icon: 'none'
						});
					}
				});
			}
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
		border-radius: 5%;
		height: 50%;
		padding: 5%;
	}
</style>
