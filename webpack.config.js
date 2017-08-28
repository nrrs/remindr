var path = require("path");
var webpack = require("webpack");

var plugins = [];
var devPlugins = [];

var prodPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: true
        }
    })
];

plugins = plugins.concat(
    process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins
);

module.exports = {
    context: __dirname,
    entry: "./remindr.jsx",
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: "bundle.js"
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: [/\.jsx?$/, /\.js?$/],
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    devtool: 'source-maps',
    resolve: {
        extensions: [".js", ".jsx", "*"],
        modules: [
            path.resolve(__dirname, 'frontend'),
            path.resolve(__dirname, 'node_modules')
        ]
    }
};