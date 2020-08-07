export class GlobsOrganizer {
    /// globs for files to grab
    globs: string[];
    /// destination folder for the files, default is to place them in the root
    folder: string;

    constructor(globs: string[], deployFilesToFolder: string = '') {
        this.globs = globs;        
        this.folder = deployFilesToFolder;
    }

    toGlob() {
        return ToGlobPattern(this.globs);
    }
}

export function ToGlobPattern(globs: string[]): string {
    let pattern = globs.map(g => cleanPaths(g)).join(",");
        
    let isSingle = globs.length < 2;
    if(isSingle) return pattern;

    return `{${pattern}}`;
}

function cleanPaths(path: string) {
    return path.replace(/\\/g, '/');
}
