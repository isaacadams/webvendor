import { GlobsOrganizer } from './index';

export class PackageDefinition {
    name: string;
    filesystem: GlobsOrganizer[];
    dependencies: PackageDefinition[];

    constructor(name: string) {
        this.name = name;
        this.filesystem = [];
        this.dependencies = [];
    }

    /// add a package dependency to this definition
    addDependency(pkg: PackageDefinition) {
        this.dependencies.push(pkg);
    }

    /// add files to the package
    addGlobsOrganizer(files: GlobsOrganizer) {
        this.filesystem.push(files);
    }
}