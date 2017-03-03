const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/client/client.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					'babel-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				use: [
					'json-loader'
				]
			}
		]
	}
}