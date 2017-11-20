'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    // The entry file. All your app roots from here.
    entry: [
        // Polyfills go here too, like babel-polyfill or whatwg-fetch
        'babel-polyfill',
        path.join(__dirname, 'app/index.js')
    ],
    // Where you want the output to go
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
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
        // webpack gives your modules and chunks ids to identify them. Webpack can vary the
        // distribution of the ids to get the smallest id length for often used ids with
        // this plugin
        new webpack.optimize.OccurenceOrderPlugin(),

        // handles creating an index.html file and injecting assets. necessary because assets
        // change name because the hash part changes. We want hash name changes to bust cache
        // on client browsers.
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        // extracts the css from the js files and puts them on a separate .css file. this is for
        // performance and is used in prod environments. Styles load faster on their own .css
        // file as they dont have to wait for the JS to load.
        new ExtractTextPlugin('[name]-[hash].min.css'),
        // handles uglifying js
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // creates a stats.json
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        // plugin for passing in data to the js, like what NODE_ENV we are in.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

    // ESLint options
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: true
    },

    node: {
        fs: "empty"
    },

    module: {
        // Runs before loaders
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: [
                    path.resolve(__dirname, "app")
                ]
            }
        ],
        // loaders handle the assets, like transforming sass to css or jsx to js.
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
            // we extract the styles into their own .css file instead of having
            // them inside the js.
            loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass')
        },
        {
            test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/,
            loader: 'file'
        },
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
        }]
    },
    postcss: [
        require('autoprefixer')
    ]
};
