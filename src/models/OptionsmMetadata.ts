export class OptionsMetadata {
    name: string;
    required: boolean;
    definition: string;

    constructor(name: string, required: boolean, definition = '') {
        /** @type {string} name of the option */
        this.name = name;
        /** @type {boolean} true if option is required */
        this.required = required;
        /** @type {string} definiton of what the option does */
        this.definition = definition;
    }
}