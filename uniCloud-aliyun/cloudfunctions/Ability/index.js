'use strict';
function GetTime() {
	// 获取utc+8的小时数
	const time = getOffsetDate(8)
	let y = time.getFullYear() //年
	let m = time.getMonth() + 1 //月-整数值0（1月）到11（12月）故需要加1。
	let d = time.getDate() //日
	let h = time.getHours() //时
	let mm = time.getMinutes() //分
	let s = time.getSeconds() //秒
	return (y + '年' + m + '月' + d + '日' + " " + h + ':' + mm)
}

function getOffsetDate(offset) {
	return new Date(
		Date.now() + (new Date().getTimezoneOffset() + (offset || 0) * 60) * 60000
	)
}

exports.main = async (event, context) => {
	let params = event.params || {}
	let res = {}
	console.log('event', event)
	switch (event.action) {
		case 'EventActionName': {
				res = {
					code: 200,
					success: true,
					message: "请求成功",
					data: {
					}
				}
			break;
		}

		default:
			res = {
				code: 404,
				msg: 'NOT_FOUND'
			}
			break;
	}

	//返回数据给客户端
	return res
};
