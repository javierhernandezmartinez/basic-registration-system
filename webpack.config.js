const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
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
            {
                test: /\.(eot|gif|otf|png|svg|ttf|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [ 'file-loader' ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./public/index.html',
        }),
    ],

};