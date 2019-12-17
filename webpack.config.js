const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const pkgJson = require('./package')
const isDevMode = process.env.NODE_ENV !== 'production'
const entry = isDevMode ? {
  'demo': './demo/index.js',
  'performance': './demo/performance.js',
  'plugin': './demo/plugin.js'
} : {}
const plugins = isDevMode ? [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'demo/index.html'),
    chunks: ['demo']
  }),
  new HtmlWebpackPlugin({
    filename: 'performance.html',
    template: path.resolve(__dirname, 'demo/performance.html'),
    chunks: ['performance']
  }),
  new HtmlWebpackPlugin({
    filename: 'plugin.html',
    template: path.resolve(__dirname, 'demo/plugin.html'),
    chunks: ['plugin']
  })] : []
module.exports = {
  output: {
    library: "OnePlayer"
  },
  entry,
  module: {
    rules: [
      {
        test: /\.art$/,
        use: {
          loader: 'art-template-loader'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NAME: JSON.stringify(pkgJson.name),
      VERSION: JSON.stringify(pkgJson.version)
    })
  ].concat(plugins)
}
