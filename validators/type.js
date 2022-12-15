const type_handlers = {
    number(val) {
        return typeof val === 'number';
    },
    object(val) {
        return !!val && val.constructor === Object;
    },
    array(val) {
        return Array.isArray(val);
    },
    string(val) {
        return typeof val === 'string';
    },
    null(val) {
        return val === null;
    },
    function(val) {
        return typeof val === 'function';
    },
    undefined(val) {
        return typeof val === 'undefined';
    },
};

module.exports = {
    name: 'type',
    description: 'Value must have one of the specified JavaScript types.',
    handler(value, options, key) {
        if (typeof value === 'undefined') return;
        let types = typeof options === 'string' ? options.split(',') : options;
        const passes = types.some((type) => {
            return type_handlers[type](value);
        });
        if (!passes) {
            let type_message;
            if (types.length > 1) {
                let type_beautified =
                    types.slice(0, -1).join(', ') + ` or ${types.pop()}`;
                type_message = `must be either ${type_beautified}.`;
            } else {
                type_message = `must be a(n) ${types}`;
            }
            return `Property ${key} ${type_message}.`;
        }
    },
};
