export default {
	namespaced: true,
	state: {
		url: ''
	},
	// 同步操作
	mutations: {
		setUrl(state, data) {
			state.url = data;
		}
	},
	// 异步操作
	actions: {}
};
