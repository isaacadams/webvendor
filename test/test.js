let {webvendor} = require('../dist/main'),
//webpackager = require('@isaacadams/webvendor'),
    path = require('path');

let opts = {
    html: "Hello World",
    output: path.resolve(process.cwd(), "wwwroot")
};

console.log(webvendor);

webvendor(opts)
    .addFontAwesome()
    .addBootstrap()
    .deploy();