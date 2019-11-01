let webpackager = require('./../src/main'),
    { path } = require('./../libraries');

let opts = {
    html: "Hello World",
    output: path.resolve(process.cwd(), "test/wwwroot")
};
webpackager(opts)
    .addBootstrap()
    .deploy();