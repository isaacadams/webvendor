import * as fs from 'fs';
import * as path from 'path';

export class PackageJson {
    constructor() {
        //this.path = PackageJson.find();
        //this.json = JSON.parse(fs.readFileSync(this.path));
        //this.root = path.resolve(this.path, "../");
        //this.node_modules = path.resolve(this.root, "node_modules");

        this.root = process.mainModule.path;
        this.path = path.resolve(this.root, "package.json");
        this.json = JSON.parse(fs.readFileSync(this.path));
        this.node_modules = path.resolve(this.root, "node_modules");
    }
    
    searchNodeModules(packageName) {
        let packageDirectory = path.resolve(this.node_modules, packageName);
        let exists = fs.existsSync(packageDirectory);
        if (!exists)
            throw new Error(`Coult not find ${packageName} in ${this.node_modules}`);
        return packageDirectory;
    }

    // find what? its meant to find the path to root module's package.json
    static find() {
        console.log(process.mainModule.path);
        let cwd = process.cwd();
        let currentDirectory = stripOutParentsToIgnore(cwd);
        let packageJsonFilePath;
        while (!doesFileLiveUnderneath(currentDirectory))
            currentDirectory += "/..";
        //console.log('found: ' + packageJsonFilePath);
        return packageJsonFilePath;
        function stripOutParentsToIgnore(cwd) {
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
        function doesFileLiveUnderneath(dir) {
            packageJsonFilePath = path.resolve(dir, "package.json");
            //console.log(packageJsonFilePath);
            let exists = fs.existsSync(packageJsonFilePath);
            return exists;
        }
    }
}