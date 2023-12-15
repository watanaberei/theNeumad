const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  // Set the mode to 'development' or 'production'
  mode: 'development',

  // Entry point of your application
  entry: './src/index.js',

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
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
      },
      {
        test: /\.css$/, // Add this to handle CSS files
        use: [
          'style-loader', // Creates `style` nodes from JS strings
          'css-loader', // Translates CSS into CommonJS
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Add this to handle image files
        type: 'asset/resource',
      },
      // Add other rules for different file types as needed
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

  plugins: [
        new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your template file
      filename: 'index.html', // Output file name (placed in the output.path directory)
      inject: true, // Injects the scripts into the body by default
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
  ],

  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"), // Serve static files from the 'public' directory
    },
    compress: true,
    port: 3000,
    open: true,
  },
};