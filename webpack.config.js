/*eslint-env node*/
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + "/app/index.html",
	filename: "index.html",
	inject: "body"
});

module.exports = {
	entry: [
		"./app/index.js"
	],
	output: {
		path: __dirname + "/dist",
		filename: "index_bundle.js",
		publicPath: "/"
	},
	module: {
		preLoaders: [
			{ test: /\.jsx?$/, loaders: ["jshint"], include: /app/ }
		],
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader?insertPragma=React.DOM&harmony" },
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {presets: ["es2015"] } }, 
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.scss$/, loaders: ["style", "css", "sass"] }
		]
	},
	plugins: [HtmlWebpackPluginConfig],
	resolve: {
		extensions: ["", ".js", ".jsx"]
	}
};