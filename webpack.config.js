const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const outputDir = 'dist'
module.exports = {
  mode: 'development',
  entry: './src/browser.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.template.html'
    })
  ],
  output: {
    filename: 'browser.js',
    path: path.resolve(__dirname, outputDir)
  },
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
}