const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: "./src/index.js", // Entry point set to src/index.js
  devtool: 'inline-source-map', // Source mapping
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
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/components"),
      Screens: path.resolve(__dirname, "src/screens"),
      Assets: path.resolve(__dirname, "src/assets"),
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

  // plugins: [
    
  //   new HtmlWebpackPlugin({
  //     // template: "./src/index.html", // Path adjusted to src/index.html
  //     // filename: 'index.html',
  //     // inject: true,
  //     template: path.resolve(__dirname, "./src/index.html"),
  //   }),
  //   new webpack.DefinePlugin({
  //     'process.env': JSON.stringify(process.env)
  //   }),
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, "index.html"),
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your template file
      filename: 'index.html', // Output file name (placed in the output.path directory)
      inject: true, // Injects the scripts into the body by default
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  devServer: {
    // hot: true,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    compress: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
};























































// const path = require('path');


// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require('webpack');

// module.exports = {
//   mode: 'development',
//   entry: "./src/index.js",
//   devtool: 'inline-source-map', // Added for source mapping 
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
//       },
//       {
//         test: /\.css$/, // Add this to handle CSS files
//         use: [
//           'style-loader', // Creates `style` nodes from JS strings
//           'css-loader', // Translates CSS into CommonJS
//         ],
//       },
//       {
//         test: /\.(png|svg|jpg|jpeg|gif)$/i, // Add this to handle image files
//         type: 'asset/resource',
//       },
//       // Add other rules for different file types as needed
//     ]
//   },

//   resolve: {
//     alias: {
//       Components: path.resolve(__dirname, "/src/components"),
//       Screens: path.resolve(__dirname, "/src/screens"),
//       // Css: path.resolve(__dirname, "/css"),
//       // Assets: path.resolve(__dirname, "/src/assets"),
//       // Define other aliases as needed
//     },
//     fallback: {
//       "process": require.resolve("process/browser"),
//       "fs": false,
//       "path": false,
//       "http": require.resolve("stream-http"),
//       "crypto": require.resolve("crypto-browserify"),
//       "stream": require.resolve("stream-browserify"),
//       "zlib": require.resolve("browserify-zlib"),
//       "net": false, // Set to false if not used on client-side
//       "async_hooks": false, // Typically a server-side module
//     },
//   },

//   output: {
//     filename: "bundle.js",
//     path: path.resolve(__dirname, "public"),
//     clean: true,
//   },

//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     new HtmlWebpackPlugin({
//       title: 'Hot Module Replacement',
//       template: path.resolve(__dirname, ".", "/src/index.html"),
//       filename: 'index.html', // Output file name (placed in the output.path directory)
//       inject: true, // Injects the scripts into the body by default
//     }),
//     new webpack.DefinePlugin({
//       'process.env': JSON.stringify(process.env)
//     }),
//   ],
//   devServer: {
//     hot: true,
//     static: {
//       directory:  path.resolve(__dirname, "."),
//     },
//     compress: true,
//     port: 3000,
//     open: true,
//     historyApiFallback: true, // Added for SPA routing
//   },
// };