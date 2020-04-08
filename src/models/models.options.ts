export class Options {
    html: string; // output file i.e. index.html
    output: string; // output folder i.e. dist/
    constructor(html: string, output: string) {
        this.html = html;
        this.output = output;
    }
}