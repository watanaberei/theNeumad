const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  externals: {
    mongoose: 'commonjs mongoose',
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "path": require.resolve("path-browserify"),
      "net": require.resolve("net-browserify"),
      "async_hooks": false, // This is typically a server-side module and may not need a client-side polyfill.
    },
  },
  
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
 