class GlobsOrganizer {
    constructor(globs, folder = '') {
        /** @type {string[]} globs for files to grab */
        this.globs = globs;
        /**
         * @type {string}
         * folder to place matched files underneath
         * will be placed in root if none specified
         */
        this.folder = folder;
    }
}

module.exports = GlobsOrganizer;