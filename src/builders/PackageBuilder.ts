import { PackageDefinition, GlobsOrganizer } from '../models';

export class PackageBuilder {
    main: PackageDefinition;

    constructor(name: string) {
        this.main = new PackageDefinition(name);
    }

    addFiles(globs: string[], folder: string = ''): PackageBuilder {
        let o = new GlobsOrganizer(globs, folder);
        this.main.addGlobsOrganizer(o);
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