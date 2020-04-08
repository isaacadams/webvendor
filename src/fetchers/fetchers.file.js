import * as fs from 'fs';
import * as path from 'path';
//import * as glob from 'glob';
let glob = require('glob');
import { PackageJson } from "./../PackageJson";
import { PackageDefinition } from '../models';

export class FileFetcher {
    constructor() {
        this.pkgJson = new PackageJson();
    }

    /**
     * fetch the files defined in the package definition
     * @param {PackageDefinition} pkg 
     */
    fetchPackage(pkg){
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

function searchForGlob(s, pkgFolder){
    return new Promise((res, rej) => {
        let globs = s.globs.map(g => cleanPaths(g));
        let hasMultiple = globs.length > 1;
        globs = globs.join(",");
        globs = hasMultiple ? `{${globs}}` : globs;        
        let pat = `${pkgFolder}/${globs}`;
        console.log(`searching for glob: ${pat}`);
        glob(
            pat,
            (e, files) => { 
                console.log('found the following:');               
                console.log(files);
                
                if(e) rej(e);
                res({
                    folder: s.folder,
                    files                        
                });
            }
        );
    });
}

function cleanPaths(path){
    return path.replace(/\\/g, '/');
}

function test(){
    let g = new PackageDefinition('glob', ['*.js', 'README.md', 'change*']);
    new FileFetcher()
        .fetchPackage(g)
        .then(f => console.log(f));
}

//test();