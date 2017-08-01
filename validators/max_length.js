const _ = require('lodash');

/**
 * validator: max_length
 * it throws error for strings that are more than specified max length
 */
module.exports = {
    title: 'max_length',
    description: 'Length of the element should be equal or less than max_length.',
    handler(value, options, key, message, attributes) {
        if ( typeof value === 'string' && value.length > +options ) {
            return message.format({
            	attribute: key,
            	max: options
            });
        }
    }
};
