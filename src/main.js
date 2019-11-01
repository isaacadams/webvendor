let BootstrapPackage = require('./packages/bootstrap'),
    fontawesome = require('./packages/fontawesome'),
    OptionsValidator = require('./OptionsValidator'),
    { PackageDefinition } = require('./models/models.module'),
    PackageDeployer = require('./PackageDeployer');

class webpackager {
    constructor(options) {        
        this.opts = new OptionsValidator().process(options);
        /** @type {PackageDefinition[]} */
        this.packages = [];
    }

    add(p){
        this.packages.push(p);
    }

    deploy() {
        let publicOutputFolder = this.opts.output;
        let deployer = new PackageDeployer();

        this.packages.map(p => {
            deployer.deploy(p, publicOutputFolder);
        });
    }
}

module.exports = function(options) {
    let wp = new webpackager(options);

    return {
        addBootstrap: function(){
            let bs = new BootstrapPackage();
            wp.add(bs.definition);
            //return bs.api;
            return wp;
        },
        addFontAwesome: function(){

        }
    };
};