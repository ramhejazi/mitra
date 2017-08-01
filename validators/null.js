/**
 * validator: boolean
 */
module.exports = {
  name: 'null',
  description: 'Element must be a null.',
  handler(value, options, key, message, attributes) {
    if ( value !== null ) {
      return message.format({
        attribute: key
      });
    }
  }
}
