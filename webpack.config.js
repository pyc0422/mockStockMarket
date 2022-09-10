const path = require('path');
const SRC_DIR = path.join(__dirname, "./client/src")
module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename:'bundle.js',
    path:path.join(__dirname, "./client/dist"),

  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
    ],
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
};