const path = require('path')
const currentTask = process.env.npm_lifecycle_event
//pm install mini-css-extract-plugin
const MiniCssExtractPlugins = require('mini-css-extract-plugin')
//npm install html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
//npm install clean-webpack-plugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//npm install webpack-manifest-plugin
const {WebpackManifestPlugin} = require('webpack-manifest-plugin')

const config = {
    entry: './app/app.js',
    output: {
        filename: 'myBundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:
        [new HtmlWebpackPlugin({template: './app/index.html'})],
    mode: 'development',
    //removes warning message from chrome 'devTools failed to load SourceMap' by enabling sourceMap
    devtool: 'eval-cheap-source-map',
    //npm install webpack-dev-server for live updates and auto refresh page
    devServer: {
        port: 3000,
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true
    },
    module: {
        rules: [
            {
                //npm install sass sass-loader
                //npm install css-loader style-loader
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //npm install babel-loader @babel/core @babel/preset-env @babel/preset-react lets your code work in older versions of a web browser
                        //npm install core-js regenerator-runtime lets you use await/async and work on older web browser versions
                        presets: [
                            ['@babel/preset-env',
                                {
                                    'useBuiltIns': 'usage',
                                    'corejs': 3,
                                    'targets': 'defaults'
                                }
                            ], '@babel/preset-react']
                    }
                }
            }
        ]
    }
}

if (currentTask == 'build') {
    config.mode = 'production'
    config.module.rules[0].use[0] = MiniCssExtractPlugins.loader
    config.plugins.push(new MiniCssExtractPlugins({filename: 'main.[hash].css'}), new CleanWebpackPlugin(), new WebpackManifestPlugin())
}

module.exports = config