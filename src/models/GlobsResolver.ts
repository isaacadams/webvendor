import path from 'path';
import glob from 'glob';
import { IFileResolver } from './IFileResolver';
import { ToGlobPattern } from './GlobsOrganizer';

export class GlobsResolver implements IFileResolver {
    glob: string;

    constructor(globs: string[]) {
        this.glob = ToGlobPattern(globs);
    }

    GetAbsoluteFilePaths(rootDirectoryContainingFiles: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            let pattern = path.resolve(rootDirectoryContainingFiles, this.glob);

            glob(
                pattern,
                (e, files) => {
                    console.log(`found the following for glob: ${pattern}`);
                    console.log(files);

                    if (e) reject(e);

                    resolve(files);
                }
            );
        });
    }
}
