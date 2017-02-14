const webpack = require('webpack'); //to access built-in plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        main: './src/main.ts',
        style: './sass/screen.js'
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname)
    },

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },

    module: {
        loaders: [ // loaders will work with webpack 1 or 2; but will be renamed "rules" in future
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                exclude: '/js/style.js',
                loader: 'ts-loader'
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        })
    ]
};

module.exports = config;
