import path from 'path';

export interface IFolder {
    name: string;
    files: string[];
}

export class Folder implements IFolder {
    parentPath: string;
    fullPath: string;
    name: string;
    files: string[];
    folders: {
        [id: string]: Folder;
    };
    constructor(parentPath: string, name: string) {
        this.parentPath = path.resolve(parentPath);
        this.fullPath = path.resolve(parentPath, name);
        this.name = name;
        this.files = [];
        this.folders = {};
    }
    createSubFolder(name: string): Folder {
        let subFolder = new Folder(this.parentPath, name);
        this.folders[name] = subFolder;
        return subFolder;
    }
}
