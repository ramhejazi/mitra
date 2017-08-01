const _ = require('lodash');

/**
 * validator: max
 * it throws error for numbers that are more than specified max number
 */
module.exports = {
  title: 'max',
  description: 'Element (number) should be equal or less than max.',
  handler(value, options, key, message, attributes) {
    let max = options.indexOf('$') === 0 ? attributes[options.slice(1)] : +options;
    if ( typeof value === 'number' && value > max ) {
        return message.format({
        	attribute: key,
        	max
        });
    }
  }
}
