let {webvendor} = require('../dist/main'),
//webpackager = require('@isaacadams/webvendor'),
    path = require('path');

let opts = {
    html: "Hello World",
    //process.cwd()
    output: path.resolve(__dirname, "wwwroot")
};

webvendor(opts)
    .addFontAwesome()
    .addBootstrap()
    .deploy();