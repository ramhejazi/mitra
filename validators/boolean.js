/**
 * validator: boolean
 */
module.exports = {
  name: 'boolean',
  description: 'Element must be a boolean.',
  handler(value, options, key, message, attributes) {
    if ( typeof value !== 'boolean' ) {
      return message.format({
        attribute: key
      });
    }
  }
}
