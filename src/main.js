import Vue from 'vue';
import App from './App';
import './main.less';
import store from './store';
import config from './config';

// 输出环境标记
config.displayEnvInfo();

// 在每个vue组件里使用  this.$store
Vue.use({
	install(Vue, options) {
		Vue.prototype.$store = store;
	}
});

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
	// 小程序app.json配置
	config: {
		// 页面前带有^符号的，会被编译成首页，其他页面可以选填，会自动把 webpack entry 里面的入口页面加进去
		pages: ['^pages/index/main'],
		window: {
			navigationBarTitleText: 'A mp compress demo',
			navigationBarTextStyle: 'white',
			navigationBarBackgroundColor: '#FFA545',
			backgroundColor: '#fff',
			backgroundTextStyle: 'dark',
			enablePullDownRefresh: false
		},
		networkTimeout: {
			request: 30000
		},
		usingComponents: {
			'van-tabbar': '../static/vant/tabbar/index',
			'van-tabbar-item': '../static/vant/tabbar-item/index'
		}
	}
};
