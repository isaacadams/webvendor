import fs from 'fs';
import * as path from 'path';
import '@isaacadams/extensions';
import { FileFetcher } from './fetchers/FileFetcher';
import rimraf from 'rimraf';
import { PackageDefinition } from './models';

export class PackageDeployer {
    /**
     * Deploy a package from node_modules to the specified directory
     * @param {PackageDefinition} pkg package to deploy
     * @param {string} output path to deploy package
     */
    deploy(pkg: PackageDefinition, output: string) {
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
                    filesSystem.forEach(s => {
                        let pathToOutput = path.resolve(pkgDirectory, s.folder);
                        s.files.forEach(f => self.copy(f, pathToOutput));
                    });
                });
            if (pkg.dependencies.length > 0)
                pkg.dependencies.forEach(d => self.deploy(d, pkgDirectory));
        }
    }
    /**
     * Copy a file from one directory to another
     * @param {string} pathToFile the full path to the file desired to be copied
     * @param {string} toDirectory the full path to the directory for which the file should be copied
     */
    copy(pathToFile: string, toDirectory: string) {
        let filename = path.basename(pathToFile);
        let newFilePath = path.resolve(toDirectory, filename);
        
        return new Promise((res, rej) => {
            fs.ensureDirectoryExists(toDirectory, '');
            

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
}