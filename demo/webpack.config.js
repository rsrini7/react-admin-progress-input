const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
      {
        test: /\.css$/,  
        exclude: /node_modules/,  
        loaders: ['style-loader', 'css-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HardSourceWebpackPlugin(),
  ],
  resolve: {
    alias: {
      'ra-customizable-datagrid': path.join(__dirname, '..', 'src'),
    },
  },
  devServer: {
    stats: {
      children: false,
      chunks: false,
      modules: false,
    },
  },
};
