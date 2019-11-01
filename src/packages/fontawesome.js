let { PackageDefinition } = require('../models/models.module');

/**
 * Fontawesome dependency information
 * https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers
 * 
 */

class FontAwesomePackage {
    constructor() {
        this.repository = 'https://github.com/FortAwesome/Font-Awesome';
        this.definition = new PackageDefinition(
            'font-awesome', 
            [
                /* "all.css", // could be replaced with all.js
                "/svgs/*",
                "/webfonts/*" */
                "**/font-awesome.min.css",
                "**/fonts/*"
            ]
        );

        this.api = {}
    }
}


module.exports = FontAwesomePackage;