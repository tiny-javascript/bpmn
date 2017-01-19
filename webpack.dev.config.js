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
                loaders: [
                    'react-hot', 'babel?presets[]=es2015&presets[]=react&presets[]=stage-1&plugins[]=transform-object-rest-spread&plugins[]=transform-decorators-legacy'
                ],
                exclude: [/node_modules/]
            }
        ]
    },
    resolve: {
        root: path.resolve('src'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", Infinity)],
    devServer: {
        contentBase: './',
        devtool: 'eval',
        host: '127.0.0.1',
        port: 5678
    },
    devtool: 'eval'
};
