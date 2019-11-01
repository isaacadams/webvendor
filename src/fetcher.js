let path = require('path'),
    fs = require('fs');
    //{ Options } = require('./models/Options'),
    //{ PackageDefinition } = require('./models/PackageDefinition');


class FileFetcher {
    /**
     * 
     * @param {Options} opts 
     */
    constructor(opts) {
        this.opts = opts;
    }

    fetchPackage(){

    }

}

class PackageJson {
    constructor(){
        this.path = PackageJson.find();   
        this.json = JSON.parse(fs.readFileSync(this.path));
        console.log(this.json);
    }

    static find() {
        let cwd = process.cwd();    
        let currentDirectory = stripOutParentsToIgnore(cwd);
        let packageJsonFilePath;

        while(!doesFileLiveUnderneath(currentDirectory))
            currentDirectory += "/.."; 

        //console.log('found: ' + packageJsonFilePath);
        return packageJsonFilePath;

        function stripOutParentsToIgnore(cwd) {
            let ignoreParents = ["node_modules"];
            let dirs = cwd.split("\\");
            ignoreParents.map(p => {
                let i = dirs.indexOf(p);

                if(i < 0) return;
                
                dirs = dirs.slice(0, i);
            });
            let strippedDir = dirs.join("\\");
            //console.log(cwd);
            //console.log(strippedDir);
            return strippedDir
        }

        function doesFileLiveUnderneath(dir){
            packageJsonFilePath = path.resolve(dir, "package.json");
            //console.log(packageJsonFilePath);
            let exists = fs.existsSync(packageJsonFilePath);
            return exists;
        }
    }
}

new PackageJson();