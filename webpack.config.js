"use strict";

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'app/index.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        path: path.resolve(__dirname, 'node_modules'),
        alias: {
            "bootstrap.css": path.resolve("./node_modules/bootstrap/dist/css/bootstrap.min.css"),
            "es6-promise": path.resolve("./node_modules/es6-promise"),
            "react": path.resolve("./node_modules/react"),
            "react-dom": path.resolve("./node_modules/react-dom"),
            "react-dom-factories": path.resolve("./node_modules/react-dom-factories"),
            "jquery": path.resolve("./node_modules/jquery"),
            "jQuery": path.resolve("./node_modules/jquery"),
            "ag-grid": path.resolve('./node_modules/ag-grid'),
            "ag-grid-enterprise": path.resolve('./node_modules/ag-grid-enterprise')
        },
        extensions: ["", ".js"]
    },
    resolveLoader: {
        path: path.resolve(__dirname, 'node_modules')
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'app/index.tpl.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
    },
    node: {
        fs: "empty"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: [
                    path.resolve(__dirname, "app")
                ]
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: [
                    path.resolve(__dirname, "app")
                ]
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass'
            },
            { test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file' },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                  modules: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
              
        ]
    }
};
