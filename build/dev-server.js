require('./check-versions')();

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
require('./check-enviroment')();

// var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var portfinder = require('portfinder')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = port
  portfinder.getPortPromise()
  .then(newPort => {
      if (port !== newPort) {
        console.log(`${port}端口被占用，开启新端口${newPort}`)
      }
      var server = app.listen(newPort, 'localhost')
      require('webpack-dev-middleware-hard-disk')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
      })
      resolve({
        ready: readyPromise,
        close: () => {
          server.close()
        }
      })
  }).catch(error => {
    console.log('没有找到空闲端口，请打开任务管理器杀死进程端口再试', error)
  })
})
