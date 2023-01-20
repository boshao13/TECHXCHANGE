const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './client/src/index.jsx'),
  output: {
    path: path.join(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          }
        ]
      }
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new CompressionPlugin(),
  ],
};
