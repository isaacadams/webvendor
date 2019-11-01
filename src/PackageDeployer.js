let { fs, path } = require('./../libraries'),
    { PackageDefinition } = require('./models/models.module'),
    { FileFetcher } = require('./fetchers/fetchers.module');

class PackageDeployer {
    /**
     * Deploy a package from node_modules to the specified directory
     * @param {PackageDefinition} pkg package to deploy
     * @param {string} output path to deploy package
     */
    deploy(pkg, output) {
        let pkgDirectory = path.resolve(output, pkg.name);
        let fetcher = new FileFetcher();
        fetcher
            .fetchPackage(pkg)
            .then(mainPkgFiles => {
                /**
                 * most files will output directly to the package directory
                 * however, sometimes they need to be outputted to a subdirectory
                 * because of internal / relative references
                 */

                
                mainPkgFiles.map(f => this.copy(f, pkgDirectory));
            });
        if (pkg.dependencies.length > 0)
            pkg.dependencies.map(d => this.deploy(d, pkgDirectory));
    }
    /**
     * Copy a file from one directory to another
     * @param {string} pathToFile the full path to the file desired to be copied
     * @param {string} toDirectory the full path to the directory for which the file should be copied
     */
    copy(pathToFile, toDirectory) {
        let filename = path.basename(pathToFile);
        let newFilePath = path.resolve(toDirectory, filename);
        
        return new Promise((res, rej) => {
            this.mkdir(toDirectory);

            var dest = fs.createWriteStream(newFilePath);
                fs.createReadStream(pathToFile)
                    .pipe(dest)
                    .on('end', () => res())
                    .on('error', e => {
                        console.error(e);
                        rej(e);
                    });
        });
    }

    mkdir(path, root = '') {
        path = path.replace(/\\/g, "/");

        let dirs = path.split('/'), 
            dir = dirs.shift();
            
        root = root + dir + '/';
    
        if(!fs.existsSync(root))
            fs.mkdirSync(root);
    
        return !dirs.length || this.mkdir(dirs.join('/'), root);
    }
}

module.exports = PackageDeployer;