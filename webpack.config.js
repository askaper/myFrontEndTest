const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const appTitle = 'Pizza Challenge';
const filePath = path.join(__dirname, 'src','index.jsx');
const PORT = '8080';

const config = {
  entry: filePath,
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist' )
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: appTitle,
      template: path.join(__dirname, 'src', 'index.html')
    })
  ],
  module: {
    rules: [
      { test: /\.jsx$/, exclude: /node_modules/, use: [ { loader: "babel-loader" } ]},
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, loader: 'url-loader', options: { limit: 100000 } }
    ]
  },
  devServer: {
    compress: true,
    open: true,
    port: PORT
  }
}

module.exports = config;
