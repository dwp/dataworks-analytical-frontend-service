const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/server/index.js',

    target: 'node',

    externals: [nodeExternals()],
    devtool: "eval-source-map",

    output: {
        path: path.resolve('server-build'),
        filename: 'index.js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'css-loader',
                options: {
                    onlyLocals: true,
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
        ]
    }
};
