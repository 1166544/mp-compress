import envData from '../config/env';

/* ========================================================
                        小程序配置文件
======================================================== */
// 域名列表
const config = {
	// host代表某一类域名
	host: {
		'production': 'https://www.test.com', 	// 正式
		'dev': 'https://www.devtest.com' 		// 开发
	},
	upload: {
		'production': 'https://www.test.com', 	// 正式
		'dev': 'https://www.devtest.com' 		// 开发
	}
};

export default {
	get host() {
		return config.host[envData.env] || config.host['production'];
	},
	get upload() {
		return config.upload[envData.env] || config.upload['production'];
	},

	displayEnvInfo() {
		const env = envData.env;
		const host = config.host[env] || config.host['production'];
		const wxsigncoad = config.wxsigncoad[env] || config.wxsigncoad['production'];
		console.log('当前环境::', env, ', HOST::::::::::::::: ', host, wxsigncoad);
	}
};
