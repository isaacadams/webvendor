let bootstrappackage = require('./packages/bootstrap'),
fontawesomepackage = require('./packages/fontawesome'),
optsBuilder = require('./optsBuilder');


function webpackager(options) {
    
    let opts = optsBuilder(options);
    

    return {
        addBootstrap: function() {
            bootstrappackage.add();
            return this;
        },
        addFontawesome: function() {
            fontawesomepackage.add();
            return this;
        }
    };
}



module.exports = webpackager;