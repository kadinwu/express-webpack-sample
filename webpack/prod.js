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
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		sourceMapFilename: '[name].map'
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
		new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
		new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),		
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ],
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}