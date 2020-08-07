import { PackageDefinition } from '../models';

export class PackageBuilder {
    main: PackageDefinition;

    constructor(name: string) {
        this.main = new PackageDefinition(name);
    }

    addFiles(globs: string[], folder: string = ''): PackageBuilder {
        this.main.addGlobs(globs, {deployToFolder: folder})
        return this;
    }

    addDependency(pkg: PackageDefinition): PackageBuilder {
        this.main.addDependency(pkg);
        return this;
    }

    build(): PackageDefinition {
        return this.main;
    }
}