<template>
	<view class="page">
		<view style="z-index: 10;" :class="isfan?'transform-180 transform-hidden transform-3d':'transform-0'" class="box" :style="'border-radius: '+ parseInt(long*0.1) +'px;' + 'clip:rect(0px,'+ long +'px,'+ parseInt(long*0.5) +'px,0px);'">
			<view class="hr hr-center" :style="'height: ' + parseInt(long*0.02) + 'px;'"></view>
			<view class="font-full num-center":style="'font-size:'+ parseInt(long*0.8) +'px;'" v-text="old"></view>
		</view>
		<view style="z-index: 9;" :class="isfan?'transform-0 transform-3d transform-hidden':'transform-180 transform-hidden'" class="box" :style="'border-radius: '+ parseInt(long*0.1) +'px;' +'clip:rect('+ parseInt(long*0.5) +'px,'+ long +'px,'+ long +'px,0px);'">
			<view class="hr hr-center" :style="'height: ' + parseInt(long*0.02) + 'px;'"></view>
			<view class="font-full num-center":style="'font-size:'+ parseInt(long*0.8) +'px;'" v-text="num"></view>
		</view>
		<view style="z-index: 2;" class="box" :style="'border-radius: '+ parseInt(long*0.1) +'px;' + (isfan?('clip:rect('+ parseInt(long*0.5) +'px,'+ long +'px,'+ long +'px,0px);'):'')">
			<view class="hr hr-center" :style="'height: ' + parseInt(long*0.02) + 'px;'"></view>
			<view class="font-full num-center":style="'font-size:'+ parseInt(long*0.8) +'px;'" v-text="old"></view>
		</view>
		<view style="z-index: 1;" class="box" :style="'border-radius: '+ parseInt(long*0.1) +'px;' + (isfan?('clip:rect(0px,'+ long +'px,'+ parseInt(long*0.5) +'px,0px);'):'')">
			<view class="hr hr-center" :style="'height: ' + parseInt(long*0.02) + 'px;'"></view>
			<view class="font-full num-center":style="'font-size:'+ parseInt(long*0.8) +'px;'" v-text="num"></view>
		</view>
		<block v-if="apm">
			<view class="apm" :style="'margin:'+parseInt(long*0.1)+'px;font-size:'+parseInt(long*0.1)+'px;'" v-text="apm"></view>
		</block>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				old:0,
				isfan:false
			}
		},
		props:{
			num:{
				default:''
			},
			long:{
				default:0
			},
			apm:{
				default:''
			}
		},
		watch:{
			num(){
				this.isfan = true;
				setTimeout(()=>{
					this.old = this.num;
					this.isfan = false;
				},600)
			}
		},
		created() {
			this.old = this.num;
			console.log(this.apm);
		},
		methods: {
		}
	}
</script>

<style>
	.page{
		width: 100%;
		height: 100%;
		position: relative;
	}
	.box{
		position: absolute;
		width: 100%;
		height: 100%;
		background-image:linear-gradient(#161616,#111111);
	}
	.font-full{
		font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		font-weight: bold;
		color: #bbb;
		/* background-color: #333; */
	}
	.num-center{
		text-align: center;
	}
	
	.hr-center{
		position: absolute;
		top: 50%;
		right: 0;
		left: 0;
		bottom: 0;
	}
	.hr{
		width: 100%;
		background-color: #000000;
	}
	.transform-180{
		transform: rotateX(180deg);
	}
	.transform-3d{
		transition:0.6s;
		transform-style:preserve-3d;
		
	}
	.transform-hidden{
		backface-visibility:hidden;
	}
	.transform-0{
		transform: rotateX(0deg);
	}
	.apm{
		position: absolute;
		bottom: 0;
		color: #bbb;
		font-weight: bold;
		z-index: 11;
	}
</style>
