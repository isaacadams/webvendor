
export function ToGlobPattern(globs: string[]): string {
    let pattern = globs.map(g => cleanPaths(g)).join(",");

    let isSingle = globs.length < 2;
    if (isSingle)
        return pattern;

    return `{${pattern}}`;
}

export function cleanPaths(path: string) {
    return path.replace(/\\/g, '/');
}
