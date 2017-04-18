const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        'js/main': './src/main.ts',

        'css/main': './sass/main.jscss',

        'demo/js/main': './demo/src/main.ts'
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname)
    },

    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'] // note if using webpack 1 you'd also need a '' in the array as well
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    configFile: './node_modules/tslint-rules/tslint.json',

                    tsConfigFile: './tsconfig.json'
                }
            },

            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },

            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
            }
        ]
    },

    devtool: 'source-map',

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
};

module.exports = config;
