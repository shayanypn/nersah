/* global __dirname, require, module*/

const webpack = require('webpack'),
UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
path = require('path'),
env = require('yargs').argv.env, // use --env with webpack 2
libraryName = 'nersah';

let plugins = [],
  outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({ minimize: true }));
}

const config = {
	entry: __dirname + '/app/app.js',
	devtool: 'source-map',
	output: {
		path: __dirname + '/dist',
		filename: (env === 'build') ? (libraryName + '.min.js') : (libraryName + '.js'),
		library: libraryName,
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [{
				test: /(\.jsx|\.js)$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /(\.jsx|\.js)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		modules: [path.resolve('./node_modules'), path.resolve('./src')],
		extensions: ['.json', '.js']
	},
	plugins: plugins
};

module.exports = config;
