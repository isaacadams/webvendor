export class GlobsOrganizer {
    ///globs for files to grab
    globs: string[];
    /**
     * @type {string}
     * folder to place matched files underneath
     * will be placed in root if none specified
     */
    folder: string;

    constructor(globs: string[], folder: string = '') {
        this.globs = globs;        
        this.folder = folder;
    }
}