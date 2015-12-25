var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

module.exports = {
	entry: './src/client.jsx',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{ test: /\.styl$/, loaders: ['style?singleton', 'css', 'autoprefixer', 'stylus'] },
			{ test: /\.css$/, loaders: ['style?singleton', 'css', 'autoprefixer'] },
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015'],
					plugins: ["transform-decorators"]
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),

		new ClosureCompilerPlugin({
			language_in: 'ECMASCRIPT6',
			language_out: 'ECMASCRIPT5',
			compilation_level: 'SIMPLE'
		})
	]
};