const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');



module.exports = {
  // Set the mode to 'development' or 'production'
  mode: 'development',

  // Entry point of your application
  entry: './src/index.js',
  externals: {
    mongoose: 'commonjs mongoose',
    express: 'commonjs express', // Prevents bundling of express
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

    resolve: {
      alias: {
        Components: path.resolve(__dirname, "./src/components/"),
        Screens: path.resolve(__dirname, "./src/screens/"),
        // Define other aliases as needed
      },
    fallback: {
      "process": require.resolve("process/browser"),
      "fs": false,
      "path": false,
      "http": require.resolve("stream-http"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "net": false, // Set to false if not used on client-side
      "async_hooks": false, // Typically a server-side module
    },
  },
  // entry: "./src/index.js",
  entry: ['./src/index.js', './public/Search.js'],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "."), // Serve static files from the root directory
    },
    compress: true,
    port: 3000,
    open: true,
  },
};















// const path = require("path");

// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require('webpack');

// module.exports = {
//   externals: {
//     mongoose: 'commonjs mongoose',
//     express: 'commonjs express', // Prevents bundling of express
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
//   resolve: {
//     fallback: {
//       "process": require.resolve("process/browser"),
//       "fs": false,
//       "http": require.resolve("stream-http"),
//       "crypto": require.resolve("crypto-browserify"),
//       "stream": require.resolve("stream-browserify"),
//       "zlib": require.resolve("browserify-zlib"),
//       "path": require.resolve("path-browserify"),
//       "net": require.resolve("net-browserify"),
//       "async_hooks": false, // This is typically a server-side module and may not need a client-side polyfill.
//     },
//   },
//   entry: "./src/index.js",
//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "public"),
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, ".", "index.html"),
//     }),
//     new webpack.DefinePlugin({
//       'process.env': JSON.stringify(process.env)
//     }),
//   ],
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'public'), // Adjust the path as needed
//     },
//     compress: true,
//     // contentBase: path.resolve(__dirname, "."),
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
 