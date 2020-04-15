export class GlobsOrganizer {
    /// globs for files to grab
    globs: string[];
    /// destination folder for the files, default is to place them in the root
    folder: string;

    constructor(globs: string[], folder: string = '') {
        this.globs = globs;        
        this.folder = folder;
    }

    toGlob() {
        let pattern = this.globs.map(g => cleanPaths(g)).join(",");
        
        let isSingle = this.globs.length < 2;
        if(isSingle) return pattern;

        return `{${pattern}}`;
    }
}

function cleanPaths(path: string) {
    return path.replace(/\\/g, '/');
}

/* 
interface ICanGetFiles {
    GetFiles(pathToPlaceFiles: string): Promise<boolean>;
}

class FilesFromNodeModules implements ICanGetFiles {
    constructor(files: string) {
    }

    GetFiles(pathToPlaceFiles: string): Promise<boolean> {
        return null;
    }
} */