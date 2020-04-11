import { PackageDefinition } from "./PackageDefinition";

export class State {
    hasPackageJson: boolean;
    packages: PackageDefinition[];
    
    constructor() {
        /** @type {boolean} states whether project has a package.json */
        this.hasPackageJson = true;
        /** @type {PackageDefinition[]} package definitions currently loaded */
        this.packages = [];
    }
}