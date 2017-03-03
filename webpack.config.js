const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'react-hot-loader/patch',
		"webpack-dev-server/client?http://localhost:8080",
		"webpack/hot/only-dev-server",
		"./server.js"
	],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	devtool: 'cheap-module-source-map',
    devServer: {
		port: 8080,
		hot: true,
		// enable HMR on the server

		contentBase: path.resolve(__dirname, 'dist'),
		// match the output path

		publicPath: '/'
		// match the output `publicPath`
    },
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
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// enable HMR globally

		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates
    ],
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}