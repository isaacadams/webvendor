class PackageDefinition {
    constructor(name, files) {
        /** @type {string} the name of the package */
        this.name = name;
        /** @type {string[]} the files that makeup the package */
        this.files = files;
        /** @type {PackageDefinition[]} an array of dependent packages */
        this.dependencies = [];
    }
    /**
     * @param {PackageDefinition} pkg add a package dependency to this package defintion
     */
    addDependency(pkg) {
        this.dependencies.push(pkg);
    }
}

module.exports = PackageDefinition;