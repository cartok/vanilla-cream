const webpack = require("webpack")
const merge = require("webpack-merge").smart
const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CircularDependencyPlugin = require("circular-dependency-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

function absolutePath(pathString){
    return path.resolve(__dirname, pathString)
}

let config = {
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        sourceMapFilename : "[file].map",
        path: absolutePath("dist"),
    },
    resolve: {
        alias: {
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {  
                        loader: "babel-loader",
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    "css-loader?sourceMap",
                    "sass-loader?sourceMap",
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    "css-loader?sourceMap",
                ]
            },
            { test: /\.json$/, loader: "json-loader"},
        ],
    },
    devtool: "sourcemap",
    devServer: {
        contentBase: "./dist",
        compress: true,
        port: 8000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "bench"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: false,
            cwd: process.cwd(),
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-style.css",
            chunkFilename: "[id].css"
        }),
    ],
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}),
        ]
    }
}

module.exports = (env) => {
    switch(env){
        case "production":
            config = merge(config, {
                mode: "production",
                optimization: {
                    concatenateModules: false, // needs to be disabled in production mode to keep class names / to prevent Classname_Classname.
                    minimizer: [
                        new UglifyJsPlugin({
                            cache: true,
                            parallel: true,
                            sourceMap: true,
                            uglifyOptions: {
                                compress: {
                                    warnings: false,
                                    drop_console: true,
                                    // keep_classnames: true, // does not work in v2
                                },
                                mangle: {
                                    // keep_classnames: true, // does not work in v2
                                },
                                output: { 
                                    comments: false
                                },
                            },
                        }),
                    ]
                },
                plugins: [
                    new webpack.LoaderOptionsPlugin({
                        minimize: true,
                    }),
                ],
            })
            break
        case "development":
            config = merge(config, {
                mode: "development",
            })
            break
    }
    console.log(config)
    return config
}
