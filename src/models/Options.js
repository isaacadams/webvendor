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

class Options {
    constructor(html, output) {
        this.html = html;
        this.output = output;
    }
}

module.exports = {
    OptionsMetadata: OptionsMetadata,
    Options: Options
};
