const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main-[hash:8].js",
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true, // it tell Webpack Dev Server to redirect all server requests to /index.html.
    port: 3000,
  },
};
