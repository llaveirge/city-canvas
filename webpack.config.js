require('dotenv/config');
const path = require('path');
const webpack = require('webpack');

const clientPath = path.join(__dirname, 'client');
const serverPublicPath = path.join(__dirname, 'server/public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: clientPath,
  output: {
    path: serverPublicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: clientPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin(['REACT_APP_GOOGLE_MAPS_API_KEY'])
  ],
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: process.env.DEV_SERVER_PORT,
    static: {
      directory: serverPublicPath,
      publicPath: '/',
      watch: false
    },
    proxy: {
      '/api': `http://localhost:${process.env.PORT}`
    }
  },
  stats: 'summary',
  performance: {
    hints: false
  }
};
