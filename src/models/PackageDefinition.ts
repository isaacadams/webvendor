import { GlobsOrganizer } from './index';

export class PackageDefinition {
    name: string;
    filesystem: GlobsOrganizer[];
    dependencies: PackageDefinition[];

    constructor(name: string) {
        /** @type {string} the name of the package */
        this.name = name;
        /** @type {GlobsOrganizer[]} the files that makeup the package */
        this.filesystem = [];
        /** @type {PackageDefinition[]} an array of dependent packages */
        this.dependencies = [];
    }
    /**
     * @param {PackageDefinition} pkg add a package dependency to this package defintion
     */
    addDependency(pkg: PackageDefinition) {
        this.dependencies.push(pkg);
    }

    /**
     * 
     * @param {GlobsOrganizer} files add a filesystem to the package
     */
    addGlobsOrganizer(files: GlobsOrganizer) {
        this.filesystem.push(files);
    }

    /**
     * @returns {string[]} all globs configured for this package
     */
    getAllGlobs(){
        let globs = this.filesystem.map(s => s.globs);
        console.log(globs);
        return globs;
    }
}