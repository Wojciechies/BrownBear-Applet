<template>
	<view class="content">
		<view style="height: 30%;width: 100%;background-color: #FFFFFF;">
			<image style="width: 100%;height: 100%" src="/static/images/qrcode-background.svg" mode="scaleToFill">
			</image>
		</view>
		<view class="itemcontent">
			<view style="margin-top: 5%;height: 25%;">
				<u--input placeholder="请输入任意内容" border="bottom" :clearable="true" v-model="value"></u--input>
			</view>
			<view style="margin-top: 5%;height: 35%;display: flex;justify-content: center;align-items: center;">
				<uqrcode 
				ref="uqrcode" 
				canvas-id="qrcode" 
				:fileType="jpg"
				:value="uqrcodeValue" 
				:size="120" 
				:options="{ margin: 10}"
				:auto="false"></uqrcode>
			</view>
			<view style="margin-top: 9%;">

				<u-row justify="space-between" gutter="10" customStyle="margin-bottom: 10px">
					<u-col span="6">
						<u-button text="生成二维码" color="#5677fc" @click="generateQRCode">
						</u-button>
					</u-col>
					<u-col span="6">
						<u-button text="保存" color="#5677fc" @click="save">
						</u-button>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: null,
				uqrcodeValue: "二维码生成",
			}
		},
		methods: {
			generateQRCode() {
				console.log('value', this.value)
				if(this.value!==null){
					this.uqrcodeValue =this.value
				}
				
				this.$refs.uqrcode.make({
					success: () => {
						console.log('生成成功');
					},
					fail: err => {
						console.log(err)
					}
				});
			},
			save() {
				this.$refs.uqrcode.save({
					success: () => {
						uni.showToast({
							icon: 'success',
							title: '保存成功'
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
		border-radius: 10px;
		height: 40%;
		padding: 5%;
	}
</style>
