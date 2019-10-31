// bootstrap depends on popper.js and jquery

let { PackageDefinition } = require('../models/PackageDefinition');

/**
 * Bootstrap dependency information
 * https://getbootstrap.com/docs/4.0/getting-started/contents/#css-files
 * 
 * 
 */

class BootstrapPackage {
    constructor() {
        this.repository = 'https://github.com/twbs/bootstrap';
        this.definition = new PackageDefinition(
            'bootstrap', 
            [
                "bootstrap.min.css",
                "bootstrap.bundle.min.js"
            ]
        );
        /* let package = packageBuilder('bootstrap', [
            packageBuilder('popper.js', ''),
            packageBuilder('jquery', '')
        ]);  */

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


module.exports = BootstrapPackage;