import { PackageDefinition, GlobsOrganizer } from './../models';

export class PackageBuilder {
        
    constructor(name) {
        this.main = new PackageDefinition(name);
    }
    
    /**
     * @param {string[]} globs files to capture and output into package folder
     * @returns {PackageBuilder}
     */
    addFiles(globs){
        let o = new GlobsOrganizer(globs);
        this.main.addGlobsOrganizer(o);
        return this;
    }

    /**
     * @param {string[]} globs files to capture
     * @param {string} folder a sub folder to output captured files into
     * @returns {PackageBuilder}
     */
    addFiles(globs, folder) {
        let o = new GlobsOrganizer(globs, folder);
        this.main.addGlobsOrganizer(o);
        return this;
    }

    /**
     * 
     * @param {PackageDefinition} pkg a dependency to the package
     * @returns {PackageBuilder}
     */
    addDependency(pkg){
        this.main.addGlobsOrganizer(pkg);
        return this;
    }

    /**
     * @returns {PackageDefinition}
     */
    build() {
        return this.main;
    }
}