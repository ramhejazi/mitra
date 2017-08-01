/**
 * validator: array
 */
module.exports = {
  name: 'undefined',
  description: 'Element must be undefined',
  handler(value, options, key, message, attributes) {
    if ( value !== undefined ) {
      return message.format({
        attribute: key
      });
    }
  }
}
