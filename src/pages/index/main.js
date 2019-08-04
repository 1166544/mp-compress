import Vue from 'vue';
import App from './index';

const app = new Vue(App);
app.$mount();
export default {
	config: {
		navigationBarTitleText: 'A mp compress demo',
		navigationStyle: 'custom'
	}
};
