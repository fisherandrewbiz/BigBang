const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: "./client/src/main.js",
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'client/src/'),
            'process': 'process/browser',
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, './node_modules'),
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader"
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {
                                    name: 'removeViewBox',
                                    active: false,
                                }
                            ]
                        }
                    },
                ]
            }
        ]
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, './server/public'),
    },
    devtool: 'source-map',
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                BASE_URL: JSON.stringify(process.env.BASE_URL),
                URL: JSON.stringify(process.env.URL)
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './client/public/index.html'),
            title: 'TaskOrbiter',
            environment: process.env.NODE_ENV
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': process.env.BASE_URL || 'http://localhost:8000'
        }
    },
};