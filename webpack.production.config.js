var webpack = require('webpack');

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
					presets: ['react', 'es2015']
				}
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: false,
			compress: {
				warnings: false
			}
		})
	]
};