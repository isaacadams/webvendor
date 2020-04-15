import glob from 'glob';
import { PackageJson } from "../PackageJson";
import { PackageDefinition, GlobsOrganizer } from '../models';

export class FileFetcher {
    pkgJson: PackageJson;

    constructor() {
        this.pkgJson = new PackageJson();
    }

    /**
     * fetch the files defined in the package definition
     * @param {PackageDefinition} pkg 
     */
    fetchPackage(pkg: PackageDefinition): Promise<IGlobSearch[]> {
        console.log(`fetching ${pkg.name}...`);
        let pkgFolder = cleanPaths(this.pkgJson.searchNodeModules(pkg.name));
        return new Promise((res, rej) => {
            let promises = pkg.filesystem.map(s => {
                return searchForGlob(s, pkgFolder);
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

interface IGlobSearch {
    folder: string,
    files: string[]
}

function searchForGlob(organizer: GlobsOrganizer, pkgFolder: string): Promise<IGlobSearch> {
    return new Promise((res, rej) => {
        let {folder} = organizer;
        let pat = `${pkgFolder}/${organizer.toGlob()}`;
        console.log(`searching for glob: ${pat}`);

        glob(
            pat,
            (e, files) => { 
                console.log('found the following:');               
                console.log(files);
                
                if(e) rej(e);
                res({
                    folder,
                    files                        
                });
            }
        );
    });
}

function cleanPaths(path: string) {
    return path.replace(/\\/g, '/');
}