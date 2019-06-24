const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputFolder = path.resolve(__dirname, './dist');

// JS
const javascript = {
    test: /\.js$/,
    use: { loader: 'babel-loader' },
};

// CSS
const css = {
    test: /\.scss$/,
    use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                ident: 'postcss',
                plugins: [autoprefixer(), cssnano()],
            },
        },
        'sass-loader',
    ],
};

// Static
const staticFiles = [
    { from: './html', to: `${outputFolder}/` },
    { from: './images', to: `${outputFolder}/images/` },
];

// Output
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: { index: './webpack.js' },
    devtool: 'source-map',
    output: {
        path: outputFolder,
        filename: 'js/[name].js',
    },
    module: {
        rules: [javascript, css],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        new CopyWebpackPlugin(staticFiles),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
            }),
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        watchContentBase: true,
        index: 'index.html',
        open: true,
        overlay: true,
    },
};
