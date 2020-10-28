const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devtool: false,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
