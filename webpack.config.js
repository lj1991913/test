var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var $ = require('jquery');
module.exports = {
	devtool: 'eval-source-map',
	entry: {
		index: __dirname + '/src/js/index/index.js',
		login: __dirname + '/src/js/login/login.js'
	},
	output: {
		filename: '[name].js',
		path: __dirname + '/dist/js',
		publicPath: '/'
	},
	devServer: {
		contentBase: "./dist", //本地服务器所加载的页面所在的目录
		historyApiFallback: true, //不跳转
		inline: true //实时刷新
	},
	module: {
		rules: [{
			test: /\.(less|css)$/,
			use: ExtractTextPlugin.extract({
				use: ['css-loader', 'less-loader'],
				publicPath: '../',
				fallback: 'style-loader',
			}),
		}, {
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			loader: 'babel-loader?presets[]=es2015'
		}, {
			test: require.resolve("jquery"),
			loader: "expose-loader?$"
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '登录',
			filename: __dirname + '/dist/login.html',
			chunks: ['login'],
			template: __dirname + '/src/view/login.html'
		}), new HtmlWebpackPlugin({
			title: '首页',
			filename: __dirname + '/dist/index.html',
			chunks: ['index'],
			template: __dirname + '/src/view/index.html'
		}),
		new ExtractTextPlugin({
			filename: 'index.css',
			disable: false,
			allChunks: true,
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
};