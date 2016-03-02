var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'client/components/App.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js",
    publicPath: '/public'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      }

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
