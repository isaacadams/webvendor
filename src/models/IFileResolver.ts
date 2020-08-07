

export interface IFileResolver {
    GetAbsoluteFilePaths(rootDirectoryContainingFiles: string): Promise<string[]>;
}
