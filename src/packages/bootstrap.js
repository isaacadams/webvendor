// bootstrap depends on popper.js and jquery

let { PackageDefinition } = require('../models/models.module');

/**
 * Bootstrap dependency information
 * https://getbootstrap.com/docs/4.0/getting-started/contents/#css-files
 * 
 * bootstrap.bundle.min.js includes popper.js
 * adding in jquery dependency will be optional
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