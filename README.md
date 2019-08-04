# mpVue小程序打包 Vender 主包过大时拆分处理示例


## 1.Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run client:prod  本地运行加载生产环境配置
npm run client:dev  本地运行加载开发环境配置

# build for production with minification
npm run build 编译生产环境(默认)
```js
npm run build:prod  编译生产环境
npm run build:dev  编译开发环境
```

<br/>

## 2.注: 为了解决小程序上传包过大问题, 使用Vant组件时需要注意以下2点:
> 1.开发时用到的VANT相关组件,需要从
assets目录的vant目录中拷至
static目录的vant目录中

> 2.所有文件在拷过来使用之前需要在此网站进行在线CSS压缩
http://tool.oschina.net/jscompress/

<br/>

## 3.启动时需要在`project.config.json`中将`appid`替换成真实ID
```js
"compileType": "miniprogram",
"libVersion": "2.7.1",
"appid": "",	// 这里替换成真实APPID
"projectname": "a-mp-compress-demo",
```

## 4.build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
