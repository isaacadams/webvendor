import { BootstrapPackage } from './packages/bootstrap';
import { FontAwesomePackage } from './packages/fontawesome';
import { OptionsValidator } from './OptionsValidator';
import { PackageDefinition, Options } from './models';
import { PackageDeployer } from './PackageDeployer';

export class WebVendorAPI {
    #opts: Options;
    #packages: PackageDefinition[];

    constructor(options: Options) {
        this.#opts = options;     
        this.#packages = [];
    }

    addBootstrap(): WebVendorAPI {
        let bs = new BootstrapPackage();
        this.#packages.push(bs.definition);
        return this;
    }
    
    addFontAwesome(): WebVendorAPI {
        let fa = new FontAwesomePackage();
        this.#packages.push(fa.definition);
        return this;
    }

    deploy(): void {
        let publicOutputFolder = this.#opts.output;
        let deployer = new PackageDeployer();
        this.#packages.forEach(p => {
            deployer.deploy(p, publicOutputFolder);
        });
    }
}

export function webvendor(options: Options): WebVendorAPI {
    let opts = new OptionsValidator().process(options);
    return new WebVendorAPI(opts);
}