const webpack = require("webpack");
const webpackConfig = require("../webpack.config");
const path = require("path");

const port = 30000;
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const app = express();
const compiler = webpack(webpackConfig);
const webpackHotMiddleware = require("webpack-hot-middleware");
const open = require("opn");

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/",
    stats: "errors-only"
  })
);

app.use(webpackHotMiddleware(compiler));

app.listen(port, () => {
  open(`http://localhost:${port}`);
});
