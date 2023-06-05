const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	context: __dirname + '/src',
	entry: './components/Main.tsx',
	mode: 'development',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist',
		filename: 'bundle.js'
	},
	resolve: {
        extensions: ['.tsx', '.ts', '.js'],
		// All aliases are used for Stylus @import and @require path resolution
		// See `alias` loader option below for adding Stylus-specific aliases
		alias: {
			// A standard alias that matches the first segment of an import path
			// Note: Tilde (~) is not required, but is convention for stylesheet aliases
			// Maps @import '~styl/*' to '/path/to/src/styl/*'
			'~styl': path.join(__dirname, 'src/styl'),

			// An "exact match" alias (i.e. will only match @import 'mixins')
			// @see https://webpack.js.org/configuration/resolve/#resolvealias
			// Maps @import 'mixins' to '/path/to/src/styl/mixins'
			'mixins$': path.join(__dirname, 'src/styl/mixins'),
		},
	},
	module: {
		rules: [
            			{
				test: /\.styl$/,
				use: [
					{
						// Extracts CSS to a separate file
						loader: MiniCssExtractPlugin.loader
					},
					{
						// Translates CSS into CommonJS
						loader: 'css-loader',
						options: {
							// Required for Stylus source map output
							sourceMap: true,
						}
					},
					{
						// Compiles Stylus to CSS
						loader: 'stylus-native-loader',
						options: {
							/**
							 * Specify Stylus plugins to use. Plugins can be passed as
							 * strings instead of importing them in your Webpack config.
							 *
							 * @type {string|Function|(string|Function)[]}
							 * @default []
							 */
							use: 'nib',
						}
					},
				]
			},
            {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
			{test: /\.jsx?$/, use: 'jsx-loader', exclude: /node_modules/},
			{test: /\.css$/i, use: [MiniCssExtractPlugin.loader, "css-loader"]},
			{test: /\.ts$/, use: 'ts-loader'}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			ON_TEST: process.env.NODE_ENV === 'test'
		}),
        new HtmlWebpackPlugin({
          template: 'index.html'
        }),
		new MiniCssExtractPlugin({
			filename: 'bundle.css'
		})
	],
	performance: {
		maxAssetSize: 100000,
		hints: false
	},
}
