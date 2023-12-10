
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node', // Ensures compatibility with Node.js environment
  externals: [nodeExternals()], // Excludes node_modules from bundling
  entry: './src/index.js', // Entry point for the application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js' // Output file
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Target .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use babel-loader
          options: {
            presets: ['@babel/preset-env'] // Babel presets
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Directory for serving static files
    compress: true, // Enable gzip compression
    port: 3000 // Port for the server
  },
  resolve: {
    fallback: {
      // Polyfills for Node.js core modules for compatibility
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "zlib": require.resolve("browserify-zlib")
    }
  }
};