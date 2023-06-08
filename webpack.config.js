const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, ".", "index.html"),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "."),
    port: 3000,
    open: true,
  },
};





// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "public"),
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, ".", "index.html"),
//     }),
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//         include: /node_modules/
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//         },
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   devServer: {
//     contentBase: path.resolve(__dirname, "."),
//     port: 3000,
//     open: true,
//   },
// };









// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "public"),
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, ".", "index.html"),
//     }),
//   ],
//   devServer: {
//     contentBase: path.resolve(__dirname, "."),
//     port: 3000,
//     open: true,
//   },
// };
