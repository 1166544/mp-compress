var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var glob = require('glob');

var env = config.build.env;

var webpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true
		})
	},
	devtool: config.build.productionSourceMap ? '#source-map' : false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].js'),
		chunkFilename: utils.assetsPath('js/[id].js')
	},
	plugins: [
		// http://vuejs.github.io/vue-loader/en/workflow/production.html
		new webpack.DefinePlugin({
			'process.env': env
		}),
		new ImageminPlugin({
			externalImages: {
				// sources: [utils.assetsPath('images/**/*.png')],
				destination: utils.assetsPath('images')
			},
			test: /\.(jpe?g|png|gif|svg)$/i,
			pngquant: {
				quality: '80'
			}
		}),
		new UglifyJsPlugin({
			sourceMap: true
		}),
		// extract css into its own file
		new ExtractTextPlugin({
			// filename: utils.assetsPath('css/[name].[contenthash].css')
			filename: utils.assetsPath('css/[name].wxss')
		}),
		// Compress extracted CSS. We are using this plugin so that possible
		// duplicated CSS from different components can be deduped.
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		// keep module.id stable when vender modules does not change
		new webpack.HashedModuleIdsPlugin(),
		// split vendor js into its own file
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module, count) {
				// console.log(module.resource)
				// any required modules inside node_modules are extracted to vendor
				return (
					(module.resource &&
						/\.js$/.test(module.resource) &&
						module.resource.indexOf('node_modules') >= 0) ||
					count > 1
				);
			}
		}),
		// 拆分Vendor公共模块文件,解决小程序上传包过大问题
		new webpack.optimize.CommonsChunkPlugin({
			name: 'commons', // 新打包文件名
			chunks: ['vendor'], // 拆分模块名
			minChunks: function (module, count) {
				// 拆分规则，返回true 则拆分
				let splitRule = false;
				if (module.resource && /\.js$/.test(module.resource)) {
					if (
						// 占用体积较大文件
						module.resource.indexOf('jsencrypt.js') >= 0 ||
						module.resource.indexOf('q/q.js') >= 0 ||
						module.resource.indexOf('buffer/index.js') >= 0 ||
						module.resource.indexOf('bn.js') >= 0 ||
						module.resource.indexOf('md5.js') >= 0 ||
						module.resource.indexOf('test-data1.js') >= 0 ||
						module.resource.indexOf('mpvue') >= 0
					) {
						// console.log(module.resource, count)
						splitRule = true;
					}
				}

				return splitRule;
			}
		}),
		// extract webpack runtime and module manifest to its own file in order to
		// prevent vendor hash from being updated whenever app bundle is updated
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['commons']
		}),
		// copy custom static assets
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '../static'),
			to: config.build.assetsSubDirectory,
			ignore: ['.*']
		}])
	]
});

if (config.build.bundleAnalyzerReport) {
	var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
		.BundleAnalyzerPlugin;
	webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
