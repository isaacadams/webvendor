import { PackageBuilder } from '../builders/packageBuilder';

/**
 * Fontawesome dependency information
 * https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers
 * 
 */

export class FontAwesomePackage {
    constructor() {
        this.repository = 'https://github.com/FortAwesome/Font-Awesome';
        
        this.definition = 
            new PackageBuilder('font-awesome')
                .addFiles([
                    "**/fonts/*",
                    "**/font-awesome.min.css" // add this to same folder since it targets fonts at ../fonts/font_files
                ], "fonts")
                .build();

        this.api = {}
    }
}