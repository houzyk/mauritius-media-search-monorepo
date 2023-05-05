const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: {
		index: "./src/index.tsx"
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [{
					loader: "ts-loader",
					options: {
						compilerOptions: { noEmit: false },
					}
				}],
				exclude: /node_modules/,
			}
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "manifest.json", to: "../manifest.json" },
			],
		}),
		...getHtmlPlugins(["index"]),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		path: path.join(__dirname, "lib"),
		filename: "[name].js",
	},
};

function getHtmlPlugins(chunks) {
	return chunks.map(
		(chunk) =>
			new HTMLPlugin({
				title: "React extension",
				filename: `${chunk}.html`,
				chunks: [chunk],
			})
	);
}