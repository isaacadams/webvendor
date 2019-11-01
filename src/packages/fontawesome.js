let PackageBuilder = require('../builders/packageBuilder');

/**
 * Fontawesome dependency information
 * https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers
 * 
 */

class FontAwesomePackage {
    constructor() {
        this.repository = 'https://github.com/FortAwesome/Font-Awesome';
        
        this.definition = 
            new PackageBuilder('font-awesome')
                .addFiles(["**/font-awesome.min.css"])
                .addFiles(["**/fonts/*"], "fonts")
                .build();

        this.api = {}
    }
}


module.exports = FontAwesomePackage;