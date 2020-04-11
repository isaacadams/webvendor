import { PackageDefinition, GlobsOrganizer } from '../models';

export class PackageBuilder {
    main: PackageDefinition;

    constructor(name: string) {
        this.main = new PackageDefinition(name);
    }
    
    /* addFiles(globs: string[]): PackageBuilder {
        let o = new GlobsOrganizer(globs);
        this.main.addGlobsOrganizer(o);
        return this;
    } */

    addFiles(globs: string[], folder: string = ''): PackageBuilder {
        let o = new GlobsOrganizer(globs, folder);
        this.main.addGlobsOrganizer(o);
        return this;
    }

    addDependency(pkg: PackageDefinition): PackageBuilder {
        this.main.addDependency(pkg); // used to be this.main.addGlobsOrganizer
        return this;
    }

    build(): PackageDefinition {
        return this.main;
    }
}