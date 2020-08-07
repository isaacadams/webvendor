import fs from 'fs';
import path from 'path';
import { IFileResolver } from './IFileResolver';


export class FileResolver implements IFileResolver {
    files: string[];

    constructor(...files: string[]) {
        this.files = files;
    }

    GetAbsoluteFilePaths(rootDirectoryContainingFiles: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            let rejectedPaths: string[] = [];

            try {
                let absolutePaths = this.files
                    .map(f => path.resolve(rootDirectoryContainingFiles, f))
                    .filter(f => {
                        let exists = fs.existsSync(f);

                        if (!exists) rejectedPaths.push(f);

                        return exists;
                    });

                resolve(absolutePaths);
            }
            catch (error) {
                reject({ error, rejectedPaths });
            }
        });
    }
}
