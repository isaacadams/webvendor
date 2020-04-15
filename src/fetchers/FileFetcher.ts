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

function searchForGlob({globs, folder}: GlobsOrganizer, pkgFolder: string): Promise<IGlobSearch> {
    return new Promise((res, rej) => {
        globs = globs.map(g => cleanPaths(g));
        
        let hasMultiple = globs.length > 1;
        
        let pat = globs.join(",");
        pat = hasMultiple ? `{${pat}}` : pat;      
        pat = `${pkgFolder}/${pat}`;
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

/* function test(){
    let g = new PackageDefinition('glob', ['*.js', 'README.md', 'change*']);
    new FileFetcher()
        .fetchPackage(g)
        .then(f => console.log(f));
}
 */
//test();