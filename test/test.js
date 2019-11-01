let webpackager = require('@isaacadams/webvendor'),
    path = require('path');

let opts = {
    html: "Hello World",
    output: path.resolve(process.cwd(), "wwwroot")
};
webpackager(opts)
    .addFontAwesome()
    .addBootstrap()
    .deploy();