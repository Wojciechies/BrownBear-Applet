<template>
	<view class="page flex-center" :class="cross?'column':'row'">
		<view :style="'width:'+long+'px;'+'height:'+long+'px;'" class="clock" @click="showApm()">
			<clock :num='hours' :long="long" :apm="apm" style="height: 100% !important;"></clock>
		</view>
		<view :style="'width:'+long+'px;'+'height:'+long+'px;'" class="clock" @click="hidden()">
			<clock :num='minutes' :long="long" style="height: 100% !important;"></clock>
		</view>
		<block v-if="isshow">
			<view :style="'width:'+long+'px;'+'height:'+long+'px;'" class="clock">
				<clock :num='seconds' :long="long" style="height: 100% !important;"></clock>
			</view>
		</block>
	</view>
</template>

<script>
	import clock from './clock.vue'
	export default {
		components:{
			clock
		},
		data(){
			return{
				hours:'',
				minutes:'',
				seconds:'',
				width:0,
				long:0,
				cross:false,
				isshow:true,
				isapm:true,
				apm:''
			}
		},
		created() {
			this.timer();
			this.init();
			// #ifdef APP-PLUS
				// 屏幕常亮
				uni.setKeepScreenOn({
					keepScreenOn: true
				});
				// 隐藏状态栏
				plus.navigator.setFullscreen(true);
			// #endif
		},
		watch:{
			hours(){
				// console.log('时');
			},
			minutes(){
				// console.log('分');
			},
			seconds(){
				// console.log(this.seconds + '秒');
			}
		},
		onResize() {
			this.init();
		},
	    methods: {
			init(){
				uni.getSystemInfo({
					success:(res)=>{
						if(res.windowWidth>res.windowHeight){
							this.width = res.windowWidth;
							this.cross = false;
						}else{
							this.width = res.windowHeight;
							this.cross = true;
						}
						if(this.isshow){
							this.long = parseInt(this.width/3)-50;
						}else{
							this.long = parseInt(this.width/2)-100;
						}
					}
				})
			},
			timer(){
				let date = new Date()
				let hours = date.getHours().toString()
				this.apm='';
				if(this.isapm && hours<=12){
					this.apm='AM'
				}
				if(this.isapm && hours>12){
					hours = hours-12;
					this.apm='PM'
				}
				
				// console.error(hours)
				// hours = hours>=10?hours:(hours);
				let minutes = date.getMinutes().toString();
				minutes = minutes>=10?minutes:('0'+minutes);
				let seconds = date.getSeconds().toString();
				seconds = seconds>=10?seconds:('0'+seconds);
				if(this.hours != hours){
					this.hours = hours;
				}
				if(this.minutes != minutes){
					this.minutes = minutes;
				}
				if(this.seconds != seconds){
					this.seconds = seconds;
				}
				setTimeout(()=>{this.timer()},100);
			},
			hidden(){
				this.isshow=!this.isshow;
				this.init();
			},
			showApm(){
				this.isapm=!this.isapm;
			}
	    }
	}
</script>

<style>
	page{
		background-color: #000000;
	}
	.page{
		height: 100vh;
		background-color: #000000;
	}
	.flex-center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.row{
		flex-direction: row;
	}
	.column{
		flex-direction: column;
	}
	.clock{
		padding: 2%;
	}
</style>
