import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
	state: { //存放状态
		"isLogin": false,
		"avatar":"",
		"nickname":"",
		"uid":""
	},
	mutations: {
		updateLoginState(state,value) {
			// 变更状态
			state.isLogin=value;
		},
		updateLoginUser(state,userInfo) {
			// 变更状态
			state.avatar=userInfo.avatar;
			state.nickname=userInfo.nickname;
			state.uid=userInfo._id;
		}
	}
})

export default store
