let { fs, path, glob } = require('./../../libraries'),
    { PackageJson } = require("./../PackageJson"),
    { PackageDefinition } = require('../models/models.module');

class FileFetcher {
    constructor() {
        this.pkgJson = new PackageJson();
    }

    /**
     * fetch the files defined in the package definition
     * @param {PackageDefinition} pkg 
     */
    fetchPackage(pkg){
        let pkgFolder = cleanPaths(this.pkgJson.searchNodeModules(pkg.name));
        let pat = `${pkgFolder}/{${cleanPaths(pkg.files.join(","))}}`;
        console.log(pkg.name);
        console.log(pat);
        return new Promise((res, rej) => {
            glob(
                pat,
                (e, files) => {
                    if(e) rej(e);
                    console.log(files);
                    res(files);
                });
        });
    }
}

function cleanPaths(path){
    return path.replace(/\\/g, '/');
}

module.exports = FileFetcher;

function test(){
    let g = new PackageDefinition('glob', ['*.js', 'README.md', 'change*']);
    new FileFetcher()
        .fetchPackage(g)
        .then(f => console.log(f));
}

//test();