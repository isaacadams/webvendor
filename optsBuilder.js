

function optsBuilder(opts) {

    processOpts(opts);

    return {
        html: opts.html,
        output: opts.output
    }
}

let configuredOpts = [
    createOpt('html', true),
    createOpt('output', true)
];

function createOpt(name, required = false){
    return {
        name: name,
        required: required
    }
}

function processOpts(opts) {
    configuredOpts.forEach((c, i, a) => {
        
        if(c.required) {
            checkRequiredOpts(c, opts);
        }

    });
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

module.exports = optsBuilder;