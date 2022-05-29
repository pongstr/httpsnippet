const path = require("path");

const opts = {
  mode: "development",
  entry: "./src/index",
  target: "webworker",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "httpsnippet.js",
    libraryTarget: "umd",
    globalObject: "self",
  },
};

module.exports = [
  opts,
  {
    ...opts,
    mode: "production",
    output: {
      ...opts.output,
      filename: "httpsnippet.min.js",
    },
  },
];
