var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');
module.exports = {
    entry: {
        bundle: './index.jsx',
        vendor: ['react', 'react-dom', 'react-konva', 'konva', 'uuid']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'build/',
        filename: '[name].js',
        chunkFilename: 'chunk.[id].js',
        pathinfo: true,
        library: '[name]_library'
    },
    module: {
        loaders: [
            {
                test: /\.js(x)*?$/,
                exclude: [/node_modules/],
                loader: 'babel',
                query: {
                    compact: false,
                    presets: [
                        'es2015', 'stage-1', 'react'
                    ],
                    plugins: ['transform-object-rest-spread', 'transform-decorators-legacy']
                }
            }
        ]
    },
    resolve: {
        root: path.resolve('src'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            minimize: true,
            sourceMap: false
        }),
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", Infinity)
    ],
    devtool: 'false'
};
