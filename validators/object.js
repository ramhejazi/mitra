const _ = require('lodash');

module.exports = {
  name: 'object',
  description: 'Element must be an object.',
  handler(value, options, key, message, attributes) {
    if ( !_.isPlainObject(value) ) {
      return message.format({
        attribute: key
      });
    }
  }
}
