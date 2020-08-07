import { PackageBuilder } from '../builders/PackageBuilder';

/**
 * Bootstrap dependency information
 * https://getbootstrap.com/docs/4.0/getting-started/contents/#css-files
 * 
 * bootstrap.bundle.min.js includes popper.js
 * adding in jquery dependency will be optional
 */

export class BootstrapPackage {
    constructor() {
        this.repository = 'https://github.com/twbs/bootstrap';
        
        this.definition = 
            new PackageBuilder('bootstrap')
                .addFiles([
                    "**/bootstrap.min.css",
                    "**/bootstrap.bundle.min.js"
                ])
                .build();

        this.api = {
            includeJquery: function() {
                this.definition.addDependency(new PackageDefinition(
                    'jquery',
                    []
                ));
            }
        }
    }
}