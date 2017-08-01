const _ = require('lodash');

module.exports = {
  name: 'type',
  description: 'Checks type of an element. Accepts several options.',
  handler(value, options, attr, message, data) {
    let types = options.split(',');
    const passes = types.some(type => {
      return this.check(value, type).valid;
    });
    if ( !passes ) return message.format({
      attribute: attr,
      valid_types: types.join(', ')
    });
  }
}
