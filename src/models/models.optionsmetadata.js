class OptionsMetadata {
    constructor(name, required, definition = '') {
        /** @type {string} name of the option */
        this.name = name;
        /** @type {boolean} true if option is required */
        this.required = required;
        /** @type {string} definiton of what the option does */
        this.definition = definition;
    }
}

module.exports = OptionsMetadata;