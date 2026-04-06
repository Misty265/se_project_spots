const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      crypto: require.resolve("crypto-browserify"),
      path: require.resolve("path-browserify"),
      vm: require.resolve("vm-browserify"),
      url: require.resolve("url/"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer/"),
      os: require.resolve("os-browserify/browser"),
      tty: require.resolve("tty-browserify"),
      querystring: require.resolve("querystring-es3"),
      constants: require.resolve("constants-browserify"),
      assert: require.resolve("assert/"),
      fs: false,
      child_process: false,
      net: false,
      tls: false,
      dgram: false,
      readline: false,
      repl: false,
      cluster: false,
      module: false,
      worker_threads: false,
      fsevents: false,
      perf_hooks: false,
      async_hooks: false,
      inspector: false,
      v8: false,
      trace_events: false,
      console: false,
    },
  },
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },

  mode: "development",
  devtool: "inline-source-map",
  stats: "errors-only",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
    liveReload: true,
    hot: false,
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/images/favicon.ico",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
