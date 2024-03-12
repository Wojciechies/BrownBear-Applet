<template>
	<view class="content">
		<view class="itemcontent">
			<view class="title">
				棕熊工具箱
			</view>
			<view class="body">
				这是一款集成了常用功能的工具箱小程序
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
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
			border-radius: 5%;
			height: 60%;
			padding: 5%;
		}
	.title{
		justify-content: center;
		align-items: center;
		display: flex;
		font-size: 20px;
	}
	.body{
		margin-top: 5%;
	}
</style>
