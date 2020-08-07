import fs from 'fs';
import path from 'path';
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
        let targetDirectoryForPackage = path.resolve(output, pkg.name);
        let self = this;
        if(!fs.existsSync(targetDirectoryForPackage)){
            performDeployment();
            return;    
        }

        // if the directory pre-exists, then clean it before deploying
        rimraf(targetDirectoryForPackage, e => {
            performDeployment();
        });

        function performDeployment(){
            new FileFetcher()
                .fetchPackage(pkg)
                .then(searchResults => {
                    /**
                     * most files will output directly to the package directory
                     * however, sometimes they need to be outputted to a subdirectory
                     * because of internal / relative references
                     */                
                    searchResults.forEach(s => {
                        let pathToOutput = path.resolve(targetDirectoryForPackage, s.deploymentFolder);
                        
                        s.files.forEach(f => fs.copy(f, pathToOutput));
                    });
                });

            // handle deployment for package dependencies
            if (pkg.dependencies.length > 0)
                pkg.dependencies.forEach(d => self.deploy(d, targetDirectoryForPackage));
        }
    }
}
