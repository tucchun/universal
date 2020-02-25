const path = require("path");
const nodeExternals = require("webpack-node-externals");
module.exports = {
  entry: "./src/server.js",
  target: "node",
  mode: "development",
  externals: [nodeExternals()],
  output: {
    libraryTarget: "commonjs2",
    filename: "server.js",
    path: path.resolve(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.css?$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }
};
