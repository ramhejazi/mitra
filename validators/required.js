 module.exports = {
    name: 'required',
    description: 'The element must not have undefined or empty string value.',
    handler(value, options, key, message, attributes) {
      if ( typeof value === 'undefined' || typeof value === 'string' && value.trim().length === 0 ) {
          return message.format({
          	value,
          	attribute: key
          });
      }
    }
}
