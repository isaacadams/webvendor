let { fs, path } = require('./../libraries'),
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
            .fetchPackage(p)
            .then(mainPkgFiles => {
                mainPkgFiles.map(f => this.copy(f, pkgDirectory));
            });
        if (pkg.dependencies.length > 0)
            pkg.dependencies.map(d => this.deploy(d, pkgDirectory));
    }
    /**
     * Copy a file from one directory to another
     * @param {string} file the full path to the file desired to be copied
     * @param {string} toDirectory the full path to the directory for which the file should be copied
     */
    copy(file, toDirectory) {
        return new Promise((res, rej) => {
            //gets file name and adds it to dir2
            var f = path.basename(file);
            let newFilePath = path.resolve(toDirectory, f);
            var dest = fs.createWriteStream(newFilePath);
            fs.createReadStream(file)
                .pipe(dest)
                .on('end', () => res())
                .on('error', e => {
                    console.error(e);
                    rej(e);
                });
        });
    }
}

module.exports = PackageDeployer;