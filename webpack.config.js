var debug = process.argv[process.argv.length - 1] !== "--compress";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/app.js",
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    output: {
        path: "./",
        filename: "app.min.js"
    },
    plugins: debug ? [] : [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ],
};
