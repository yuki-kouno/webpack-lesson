const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ProvidePlugin } = require("webpack");
// const { default: utils } = require("./src/js/utils");

module.exports = ({ outputFile, assetFile }) => ({
  entry: {
    app: "./src/js/app.js",
    sub: "./src/js/sub.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: `${outputFile}.js`,
    chunkFilename: `${outputFile}.js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff2?|ttf|ept)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${assetFile}.[ext]`,
              outputPath: "images",
              publicPath: "images",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`,
    }),
    new ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      utils: [path.resolve(__dirname, "src/js/utils"), "default"],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /node_modules/,
          priority: -10,
        },
        utils: {
          name: "utils",
          test: /src[\\/]js[\\/]utils/,
        },
        default: false,
      },
    },
  },
  // ここから追加
  resolve: {
    alias: {
      "@scss": path.resolve(__dirname, "src/scss"),
      "@imgs": path.resolve(__dirname, "src/images"),
    },
    extensions: [".js", ".scss"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  // ここまで
});
