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
     * @param {PackageDefinition} package
     */
    addDependency(package) {
        this.dependencies.push(package);
    }
}

exports.PackageDefinition = PackageDefinition;