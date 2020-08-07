import { PackageJson } from "../PackageJson";
import { PackageDefinition, GlobsOrganizer, IDeploymentInstructions, GlobsResolver } from '../models';

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
    fetchPackage(pkg: PackageDefinition): Promise<IGlobSearchResults[]> {
        console.log(`fetching ${pkg.name}...`);
        let pkgFolder = cleanPaths(this.pkgJson.resolvePackageNameToPath(pkg.name));

        let promises = pkg.filesystem.map(organizer => {
            return new GlobsResolver(organizer.globs)
                .GetAbsoluteFilePaths(pkgFolder)
                .then(files => {
                    return {
                        deploymentFolder: organizer.folder,
                        files
                    };
                });
        });

        return Promise.all(promises);
    }
}

function cleanPaths(path: string) {
    return path.replace(/\\/g, '/');
}