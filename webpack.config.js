const webpack = require('webpack');
const assetsAppendWebpackPlugin = require('assets-append-webpack-plugin');

module.exports = {
    entry: './src/ts/main.ts',
    devtool: 'hidden-source-map',
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
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        new assetsAppendWebpackPlugin({
            footer: '\n//# sourceMappingURL=/bundles/app/js/main.min.js.map',
        }),
    ]
}
