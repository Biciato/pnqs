const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')

const FriendlyErrors = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
	devtool: 'inline-source-map',
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new FriendlyErrors({
			clearConsole: true
		}),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: 'src/index.html',
			inject: true
		})
	],
	devServer: {
		proxy: {
			"/pnqs": {
				"target": {
					"host": "locolab.dev",
					"protocol": 'http:',
					"port": 80
				},
				changeOrigin: true,
				secure: false
			}
		}
	}
})
