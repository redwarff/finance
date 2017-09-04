var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: [
		'./src/index.jsx' // Your appʼs entry point
	],
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: loaders.concat([
			{
				test: /semantic\.min\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
	 		},
			{
				test: /\.css$/,
				exclude: [/semantic\.min/],
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
			}
		])
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: './src/index.html'
		}]),
		new ExtractTextPlugin("styles.css"),
		new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
      output: {
        comments: false
      } 
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorOptions: { discardComments: {removeAll: true } }
		})
	]
};
