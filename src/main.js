import { BootstrapPackage } from './packages/bootstrap';
import { FontAwesomePackage } from './packages/fontawesome';
import { OptionsValidator } from './OptionsValidator';
import { PackageDefinition } from './models';
import { PackageDeployer } from './PackageDeployer';

export class WebVendorLogic {

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

export class WebVendorAPI {

    constructor(logic) {
        this.logic = logic;
    }

    addBootstrap (){
        let bs = new BootstrapPackage();
        this.logic.add(bs.definition);
        //return bs.api;
        return this;
    }
    
    addFontAwesome () {
        let fa = new FontAwesomePackage();
        this.logic.add(fa.definition);
        return this;
    }

    deploy() {
        this.logic.deploy();
    }
}

export function webvendor(options) {
    let wpl = new WebVendorLogic(options);
    return new WebVendorAPI(wpl);
}