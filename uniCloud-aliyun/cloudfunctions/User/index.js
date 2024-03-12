'use strict';

let uniID = require('uni-id-common')
exports.main = async (event, context) => {
	// const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
	// 	event,
	// 	context
	// })
	const db = uniCloud.database();

	uniID = uniID.createInstance({
		context
	})
	/* 如果你通过云函数Url访问
	 * 使用GET时参数位于event.queryStringParameters
	 * 使用POST时参数位于event.body
	 * 请自行处理上述场景
	 */
	let params = event.params || {}
	let payload = {}
	let noCheckAction = [
		'checkToken','GetOpenId'
	]
	if (noCheckAction.indexOf(event.action) === -1) {
		if (!event.uniIdToken) {
			return {
				code: 403,
				msg: '缺少token'
			}
		}
		payload = await uniID.checkToken(event.uniIdToken, {
			needPermission: true
		})
		if (payload.code && payload.code > 0) {
			return payload
		}
		params.uid = payload.uid
	}
	let res = {}

	switch (event.action) {
		case 'checkToken':
			// 注意3.0.0版本取消了checkToken接口返回的用户信息
			res = await uniID.checkToken(event.uniIdToken, {
				needPermission: true
			})
			// if (res.code == 0) {
			// 	let collection = await db.collection('uni-id-users').where({
			// 		_id: res.uid
			// 	}).get()
			// 	res.openid = collection.data[0].wx_openid.mp
			// }
			break;
			case 'GetOpenId': {
				const {
					loginCode
				} = params
				let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wx0377c4983b0615f2&secret=31fca724097696c1f68fa6301e77029f&js_code=' + loginCode + '&grant_type=authorization_code';
				res = await uniCloud.httpclient.request(
					url, {
						rejectUnauthorized: false,
						method: 'GET',
						data: {
							
						},
						contentType: 'json',
						dataType: 'json'
					})
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
