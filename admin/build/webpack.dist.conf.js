const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			// template: './build/template/index.html',
			inject: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new UglifyJsPlugin()
	]
})
