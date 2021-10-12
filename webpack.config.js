/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const config = {
    devServer: {
        open: true,
        port: 9000,
    },

    mode: 'production',

    devtool: 'source-map',

    entry: ['./src/main.ts'],

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        alias: {
            '@2048': path.resolve(__dirname, 'src/2048'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js'),
        publicPath: '/js/',
    },
};

module.exports = config;
