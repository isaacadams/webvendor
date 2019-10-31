let BootstrapPackage = require('./packages/bootstrap'),
fontawesome = require('./packages/fontawesome'),
OptionsValidator = require('./OptionsValidator');

class webpackager {
    constructor(options) {
        this.opts = new OptionsValidator().process(options);
        this.packages = [];
    }

    add(p){
        this.packages.push(p);
    }

    fetch() {

    }
}

module.exports = function(options) {
    let wp = new webpackager(options);

    return {
        addBootstrap: function(){
            let bs = new BootstrapPackage();
            wp.add(bs);
            return bs.api;
        },
        addFontAwesome: function(){

        }
    };
};