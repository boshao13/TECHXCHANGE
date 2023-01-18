const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './client/src/index.jsx'),
  output: {
    path: path.join(__dirname, './client/dist'),
<<<<<<< HEAD
    filename: 'bundle.js',
=======
    filename: 'bundle.js'
    // filename: path.join(__dirname, './public')
>>>>>>> fb6a92a72c8197e37eb2185c809b171daa0f4e79
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
<<<<<<< HEAD
    ],
=======
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
    ],//rules end
>>>>>>> fb6a92a72c8197e37eb2185c809b171daa0f4e79
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new CompressionPlugin(),
  ],
};
