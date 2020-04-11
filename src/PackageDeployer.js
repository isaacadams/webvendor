import * as fs from 'fs';
import * as path from 'path';


import { PackageDefinition } from './models/index.ts';
import { FileFetcher } from './fetchers/fetchers.file';
import rimraf from 'rimraf';

export class PackageDeployer {
    /**
     * Deploy a package from node_modules to the specified directory
     * @param {PackageDefinition} pkg package to deploy
     * @param {string} output path to deploy package
     */
    deploy(pkg, output) {
        let pkgDirectory = path.resolve(output, pkg.name);
        let self = this;
        if(!fs.existsSync(pkgDirectory)){
            performDeployment();
            return;    
        }

        // if the directory pre-exists, then clean it before deploying
        rimraf(pkgDirectory, e => {
            performDeployment();
        });

        function performDeployment(){
            let fetcher = new FileFetcher();
            
            fetcher
                .fetchPackage(pkg)
                .then(filesSystem => {
                    /**
                     * most files will output directly to the package directory
                     * however, sometimes they need to be outputted to a subdirectory
                     * because of internal / relative references
                     */                
                    filesSystem.map(s => {
                        let pathToOutput = path.resolve(pkgDirectory, s.folder);
                        s.files.map(f => self.copy(f, pathToOutput));
                    });
                });
            if (pkg.dependencies.length > 0)
                pkg.dependencies.map(d => self.deploy(d, pkgDirectory));
        }
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