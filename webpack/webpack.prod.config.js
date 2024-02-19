const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const chunks = require('./chunks.js');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve('build'),
    filename: 'static/js/[name].[chunkhash].js',
    chunkFilename: 'static/js/[name].[chunkhash].chunk.js',
    assetModuleFilename: 'static/assets/[name].[hash][ext][query]',
    clean: true,
    publicPath: '/',
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
      maxSize: Infinity,
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
