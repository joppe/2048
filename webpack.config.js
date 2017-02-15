const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
    entry: {
        main: './src/main.ts',

        demo: './src/demo.ts',

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
                test: /\.tsx?$/,
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
