var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/main.ts'
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: 'pre',
				include: helpers.root('src'),
				loader: 'tslint-loader',
				options: {
					emitErrors: true
				}
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: {configFileName: helpers.root('src', 'tsconfig.json')}
					}, 'angular2-template-loader'
				]
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=assets/[name].[hash].[ext]'
			},
			{
				test: /\.css$/,
				exclude: helpers.root('src', 'app'),
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: "css-loader",
						options: { minimize: true, sourceMap: false }
					}]
				})
			},
			{
				test: /\.scss$/,
				include: helpers.root('src'),
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//resolve-url-loader may be chained before sass-loader if necessary
					use: [{
						loader: "css-loader",
						options: { minimize: true , sourceMap: false}
					}, {
						loader: "sass-loader"
					}]
				})
			},
			{
				test: /\.css$/,
				include: helpers.root('src', 'app'),
				loader: 'raw-loader'
			}
		]
	},

	plugins: [
		// Workaround for angular/angular#11580
		// https://github.com/angular/angular/issues/11580
		new webpack.ContextReplacementPlugin(
			// if you have anymore problems tweet me at @gdi2290
			// The (\\|\/) piece accounts for path separators for Windows and MacOS
			/(.+)?angular(\\|\/)core(.+)?/,
			helpers.root('./src'), // location of your src
			{} // a map of your routes
		),

		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),

		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	]
};

