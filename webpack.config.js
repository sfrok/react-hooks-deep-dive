const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: ["react-hot-loader/patch", "./src/"],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main-[fullhash:8].js",
    publicPath: "/", //  allows you to specify the base path for all the assets within your application
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
            },
          },
        ],
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    open: true,
    overlay: true,
    hot: true,
    historyApiFallback: true, // it tell Webpack Dev Server to redirect all server requests to /index.html.
    port: 3000,
  },
};
