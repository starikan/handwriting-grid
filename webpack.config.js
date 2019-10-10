const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [new CleanWebpackPlugin(), new HtmlWebpackPlugin({ template: './src/index.html' })],
  module: {
    rules: [
      { test: /\.html$/, exclude: /node_modules/, use: { loader: 'html-loader' } },
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.s[ac]ss?$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
    ],
  },
  devtool: 'source-map',
};
