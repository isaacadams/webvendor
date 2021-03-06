import * as fs from 'fs';
import * as path from 'path';

/**
 * @property {string} root the root of whatever project webvendor is being used
 * @property {string} path path to package.json in the root project
 * @property {string} node_modules path to the node_modules folder
 */
export class PackageJson {
    root: string;
    path: string;
    node_modules: string;

    constructor() {
        if(!process.mainModule) throw new Error(`Could not find the main module when executing '${process.argv.join(' ')}'`);

        this.root = path.parse(process.mainModule.filename).dir;
        this.path = path.resolve(this.root, "package.json");
        this.node_modules = path.resolve(this.root, "node_modules");
    }

    resolvePackageNameToPath(packageName: string): string {
        let packageDirectory = path.resolve(this.node_modules, packageName);
        let packageDoesNotExistInNodeModules = !fs.existsSync(packageDirectory);
        
        // could do an autoinstall here
        if (packageDoesNotExistInNodeModules) throw new Error(`Could not find ${packageName} in ${this.node_modules}`);

        return packageDirectory;
    }
}

// find what? its meant to find the path to root module's package.json
function find() {
    //console.log(process.mainModule.path);
    let cwd = process.cwd();
    let currentDirectory = stripOutParentsToIgnore(cwd);
    let packageJsonFilePath;
    while (!doesFileLiveUnderneath(currentDirectory)) currentDirectory += "/..";
    //console.log('found: ' + packageJsonFilePath);
    return packageJsonFilePath;
    function stripOutParentsToIgnore(cwd: string) {
        let ignoreParents = ["node_modules"];
        let dirs = cwd.split("\\");
        ignoreParents.map(p => {
            let i = dirs.indexOf(p);
            if (i < 0)
                return;
            dirs = dirs.slice(0, i);
        });
        let strippedDir = dirs.join("\\");
        //console.log(cwd);
        //console.log(strippedDir);
        return strippedDir;
    }
    function doesFileLiveUnderneath(dir: string) {
        packageJsonFilePath = path.resolve(dir, "package.json");
        //console.log(packageJsonFilePath);
        let exists = fs.existsSync(packageJsonFilePath);
        return exists;
    }
}