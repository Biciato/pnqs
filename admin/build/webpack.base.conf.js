var path = require('path')
var webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	mode: isProd ? 'production' : 'development',
	entry: {
		build: ['./src/system/main.js'],
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[hash].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'scss': 'vue-style-loader!css-loader!sass-loader',
						'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					"babel-loader",
					//"eslint-loader"
				]
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.scss'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		}
	},
	plugins: [/*new BundleAnalyzerPlugin()*/]
}
