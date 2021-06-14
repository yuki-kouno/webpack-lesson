const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge").merge;
const commonConf = require("./webpack.common");
const outputFile = "[name]";
const assetFile = "[name]";

module.exports = () =>
  webpackMerge(commonConf({ outputFile, assetFile }), {
    mode: "development",
    devtool: "source-map",
    devServer: {
      open: true,
      contentBase: "./public",
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: "body",
        chunks: ["app"],
      }),
      new HtmlWebpackPlugin({
        template: "./src/other.html",
        filename: "other.html",
        inject: "body",
        chunks: ["sub"],
      }),
    ],
  });
