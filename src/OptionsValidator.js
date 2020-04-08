import { OptionsMetadata, Options } from './models';

export class OptionsValidator {
    constructor() {
        /** @type {OptionsMetadata[]} */
        this.metadata = [
            createOpt(
                'html', 
                true, 
                "Set the html file where the packages should be referenced"
            ),
            createOpt(
                'output', 
                true, 
                "Set the publicly accesible folder where the vendor files should go"
            )
        ];
    }

    /**
     * 
     * @param {Options} opts raw options inputted by user
     * @returns {Options} validated options 
     */
    process(opts) {
        let o = new Options(
            opts.html, 
            opts.output
        );

        this.metadata.forEach((c, i, a) => {
        
            if(c.required) {
                checkRequiredOpts(c, o);
            }
    
        });

        return o;
    }
}

function createOpt(name, required = false, definition = ''){
    return new OptionsMetadata(name, required, definition);
}

function checkRequiredOpts(config, opts) {
    let hasPropertyConfigured = opts.hasOwnProperty(config.name);
    let isConfigured = hasPropertyConfigured;

    if(hasPropertyConfigured)
        isConfigured = !!opts[config.name];

    if(isConfigured)
        return;

    throw new Error(`${config.name} is required`);
}