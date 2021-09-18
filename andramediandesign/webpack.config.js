const nodeExternals = require("webpack-node-externals");
const common = {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@material-ui/core": "@material-ui/core/es",
    },
  },
};
module.exports = [
  {
    ...common,
    entry: "./txsrc/client",
    output: {
      path: `${__dirname}/public`,
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/"
    },
  },
  {
    ...common,
    target: "node",
    entry: "./txsrc/server",
    output: {
      path: `${__dirname}/dist`,
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/"
    },
    // externals: [
    //   nodeExternals(),
    // ],
  },
];
