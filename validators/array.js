/**
 * validator: array
 */
module.exports = {
  name: 'array',
  description: 'Element must be an array',
  handler(value, options, key, message, attributes) {
    if ( !Array.isArray(value) ) {
      return message.format({
        attribute: key
      });
    }
  }
}
