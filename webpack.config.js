const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    entry: './app.js',
    output: {
        filename: "bundle.[hash].js",
        path: path.resolve(__dirname,'dist')
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.js','.jsx'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader'],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html',
        }),
        new NodePolyfillPlugin(),
    ],
    target: "node",
    resolve: {
        fallback: {
            fs: false
        }
    }

};