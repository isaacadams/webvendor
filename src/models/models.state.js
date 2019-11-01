class State {
    constructor() {
        /** @type {boolean} states whether project has a package.json */
        this.hasPackageJson = true;
        /** @type {PackageDefinition[]} package definitions currently loaded */
        this.packages = [];
    }
}

module.exports = State;