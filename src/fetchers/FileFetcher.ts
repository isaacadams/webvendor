import glob from 'glob';
import { PackageJson } from "../PackageJson";
import { PackageDefinition, GlobsOrganizer, IDeploymentInstructions } from '../models';

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

        return new Promise((res, rej) => {

            let promises = pkg.filesystem.map(organizer => {
                return searchForGlob(organizer.folder, organizer.toGlob(), pkgFolder);
            });

            Promise
                .all(promises)
                .then(o => {
                    res(o);
                }).catch(e => {
                    console.log(e);
                });
        });
    }
}

interface IGlobSearchResults {
    deploymentFolder: string,
    files: string[]
}

function searchForGlob(deploymentFolder: string, globPattern: string, pkgFolder: string): Promise<IGlobSearchResults> {
    return new Promise((res, rej) => {
        let pattern = `${pkgFolder}/${globPattern}`;
        console.log(`searching for glob: ${pattern}`);

        glob(
            pattern,
            (e, files) => { 
                console.log('found the following:');
                console.log(files);

                if(e) rej(e);
                res({
                    deploymentFolder,
                    files
                });
            }
        );
    });
}

function cleanPaths(path: string) {
    return path.replace(/\\/g, '/');
}