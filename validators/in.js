const _ = require('lodash');

module.exports = {
    title: 'in',
    description: 'Element must one of the allowed options.',
    handler(value, options, key, message, attributes) {
        let parts = options.split(',');
        if (value && !parts.includes(value)) {
            return message.format({
                attribute: key,
                'in': options
            });
        }
    },
};
