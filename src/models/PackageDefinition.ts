import { Folder } from './Folder';
import { GlobsResolver, IFileResolver } from './index';

export interface IDeploymentInstructions {
    config: IDeploymentConfig
    resolver: IFileResolver;
}

export interface IDeploymentConfig {
    deployToFolder: string;
}

export class PackageDefinition {
    name: string;
    //root: Folder;
    dependencies: PackageDefinition[];
    instructions: IDeploymentInstructions[];

    constructor(name: string) {
        this.name = name;
        this.dependencies = [];

        this.instructions = [];
    }

    /// add a package dependency to this definition
    addDependency(pkg: PackageDefinition) {
        this.dependencies.push(pkg);
    }

    addGlobs(globs: string[], config: IDeploymentConfig) {
        this.instructions.push({
            config,
            resolver: new GlobsResolver(globs)
        });
    }
}

