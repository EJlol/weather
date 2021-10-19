const webpack = require("webpack");
const dotenvPlugin = require('dotenv-webpack');

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    plugins: [new dotenvPlugin()],
    module: {
        rules: [{
            test: /\.(tsx?|js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: { presets: ["@babel/preset-typescript", "@babel/env"] }
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }]
    },
    resolve: { extensions: ["*", ".ts", ".tsx", ".js", ".jsx"] },
    output: {
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        port: 3000,
        hot: true
    }
};