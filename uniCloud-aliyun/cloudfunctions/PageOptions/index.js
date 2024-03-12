'use strict';

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	var result = {
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
		swiperItemList: [
			'/static/images/swiper1.png',
			'/static/images/swiper2.png',
			'/static/images/swiper3.png',
		],
		notice: {
			content: ["棕熊工具箱小程序上线啦！"],
			show: false, //是否显示
		},
		modal:{
			modalContent:"功能正在维护,请耐心等待"
		}
	}

	//返回数据给客户端
	return result
};
