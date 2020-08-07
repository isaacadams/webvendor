import { PackageJson } from "../PackageJson";
import { IDeploymentInstructions } from '../models';
import { cleanPaths } from "../models/ToGlobPattern";

interface IGlobSearchResults {
    deploymentFolder: string,
    files: string[]
}

export class FileFetcher {
    pkgJson: PackageJson;

    constructor() {
        this.pkgJson = new PackageJson();
    }

    /**
     * fetch the files defined in the package definition
     * @param {PackageDefinition} pkg 
     */
    fetchPackage(packageName: string, instructions: IDeploymentInstructions[]): Promise<IGlobSearchResults[]> {
        console.log(`fetching ${packageName}...`);
        let pkgFolder = cleanPaths(this.pkgJson.resolvePackageNameToPath(packageName));

        let promises = instructions.map(i => {
            return i.resolver
                .GetAbsoluteFilePaths(pkgFolder)
                .then(files => {
                    return {
                        deploymentFolder: i.config.deployToFolder,
                        files
                    };
                });
        });

        return Promise.all(promises);
    }
}
