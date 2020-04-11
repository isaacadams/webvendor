export class GlobsOrganizer {
    /// globs for files to grab
    globs: string[];
    /// destination folder for the files, default is to place them in the root
    folder: string;

    constructor(globs: string[], folder: string = '') {
        this.globs = globs;        
        this.folder = folder;
    }
}