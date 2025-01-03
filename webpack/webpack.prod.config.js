import path from 'node:path';
import CompressionPlugin from 'compression-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { chunks } from './chunks.js';
import common from './webpack.common.config.js';

const config = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve('build'),
		filename: 'static/js/[name].[chunkhash].js',
		chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
		assetModuleFilename: 'static/assets/[name].[hash][ext][query]',
		clean: true,
		publicPath: '/Fundamental-Webpack',
	},
	stats: 'errors-warnings',
	module: {
		rules: [
			{
				// CSS and SCSS Loader
				test: /\.s?css$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader' },
				],
			},
		],
	},
	plugins: [
		new Dotenv({
			path: './environments/.env.prd',
		}),
		new webpack.DefinePlugin({
			'process.env.TARGET_ENV': JSON.stringify('production'),
		}),
		new CompressionPlugin(),
	],
	optimization: {
		minimize: true,
		sideEffects: true,
		concatenateModules: true,
		runtimeChunk: 'single',
		minimizer: [new TerserPlugin()],
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: 10,
			maxSize: Number.POSITIVE_INFINITY,
			minSize: 2000,
			cacheGroups: chunks,
		},
	},
	performance: {
		hints: false,
		maxAssetSize: 1000000,
		maxEntrypointSize: 1000000,
	},
});

export default config;
