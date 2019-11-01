let { PackageDefinition } = require('../models/models.module');

/**
 * 
 * @param {string} name 
 * @param {PackageDefinition[]} dependencies 
 */
function packageBuilder(name, dependencies = []) {
    let p = new PackageDefinition(name, version);
    dependencies.map(p => p.addDependency(p));
    return p;
}

module.exports = {
    packageBuilder: packageBuilder,
    PackageDefinition: PackageDefinition
};