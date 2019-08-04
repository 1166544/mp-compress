import Vue from 'vue';
import Vuex from 'vuex';
import url from './modules/url';

Vue.use(Vuex);
const myPlugin = store => {
	// called when the store is initialized
	store.subscribe((mutation, state) => {
		// console.log(state.worldOrder);
		// called after every mutation.
		// The mutation comes in the format of `{ type, payload }`.
	});
};
const store = new Vuex.Store({
	modules: {
		url
	},
	plugins: [myPlugin]
});

export default store;
