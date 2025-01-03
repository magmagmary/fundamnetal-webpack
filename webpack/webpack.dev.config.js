const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	bail: true,
	output: {
		path: path.resolve(__dirname, '../../build'),
		filename: 'static/js/bundle.js',
		assetModuleFilename: 'static/assets/[name].[ext][query]',
		chunkFilename: 'static/js/[name].chunk.js',
		publicPath: '/',
	},
	stats: 'minimal',
	module: {
		rules: [
			{
				// CSS and SCSS Loader
				test: /\.s?css$/i,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' },
				],
			},
		],
	},
	plugins: [
		new Dotenv({
			path: './environments/.env.dev',
		}),
		new webpack.DefinePlugin({
			'process.env.TARGET_ENV': JSON.stringify('development'),
		}),
	],
	cache: true,
	devtool: 'cheap-module-source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'build'),
		},
		open: true,
		hot: true,
		compress: true,
		port: 4000,
		historyApiFallback: true,
	},
});
