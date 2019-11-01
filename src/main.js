let BootstrapPackage = require('./packages/bootstrap'),
    FontAwesomePackage = require('./packages/fontawesome'),
    OptionsValidator = require('./OptionsValidator'),
    { PackageDefinition } = require('./models/models.module'),
    PackageDeployer = require('./PackageDeployer');

class WebVendorLogic {
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

module.exports = function webvendor(options) {
    class WebVendorAPI {

        addBootstrap (){
            let bs = new BootstrapPackage();
            wpl.add(bs.definition);
            //return bs.api;
            return this;
        }
        
        addFontAwesome () {
            let fa = new FontAwesomePackage();
            wpl.add(fa.definition);
            return this;
        }
    
        deploy() {
            wpl.deploy();
        }
    }

    let wpl = new WebVendorLogic(options);
    return new WebVendorAPI();
};