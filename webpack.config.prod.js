const webpack = require('webpack');

module.exports = {
    entry: './src/ts/main.ts',
    output: {
        filename: 'main.min.js'
    },
    resolve: {
        extensions: [
            '.webpack.js',
            '.web.js',
            '.ts',
            '.js',
        ],
    },
    module: {
        loaders: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
    ]
}
