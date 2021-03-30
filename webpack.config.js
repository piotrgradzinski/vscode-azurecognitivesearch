/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

// See https://github.com/Microsoft/vscode-azuretools/wiki/webpack for guidance

'use strict';

const path = require('path');
const process = require('process');
const dev = require("vscode-azureextensiondev");
const CopyWebpackPlugin = require('copy-webpack-plugin');

let DEBUG_WEBPACK = !!process.env.DEBUG_WEBPACK;

let config = dev.getDefaultWebpackConfig({
    projectRoot: __dirname,
    verbosity: DEBUG_WEBPACK ? 'debug' : 'normal',
    externals: { './getCoreNodeModule': 'commonjs getCoreNodeModule' },
    plugins: [
        // @ts-ignore
        // ignoring because syntax is correct but it is throwing an error
        // https://github.com/webpack-contrib/copy-webpack-plugin/issues/455
        new CopyWebpackPlugin([
                { from: './out/src/utils/getCoreNodeModule.js', to: 'node_modules' }
        ])
    ]
});

if (DEBUG_WEBPACK) {
    console.log('Config:', config);
}

const reactWebviewExports = {
    entry: './src/webviewForDetails/index',
    devtool: DEBUG_WEBPACK ? 'cheap-source-map' : 'source-map',
    output: {
        path: path.resolve(__dirname, 'resources/webviewForDetails'),
        filename: 'webview.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                    plugins: ["@babel/transform-runtime", "@babel/plugin-proposal-class-properties"]
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    configFile: './tsconfig.json'
                }
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
};
module.exports = [reactWebviewExports, config];