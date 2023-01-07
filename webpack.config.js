const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: __dirname + '/src',
	entry: './components/Main.jsx',
	mode: 'development',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{test: /\.jsx?$/, use: 'jsx-loader', exclude: /node_modules/},
			{test: /\.css$/, use: 'css-loader'},
			{test: /\.styl$/, use: 'stylus-loader'},
			{test: /\.ts$/, use: 'ts-loader'}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			ON_TEST: process.env.NODE_ENV === 'test'
		}),
        new HtmlWebpackPlugin({
          template: 'index.html'
        })
	],
	performance: {
		maxAssetSize: 100000,
		hints: false
	},
}
