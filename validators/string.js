module.exports = {
  name: 'string',
  description: 'Element must be a string.',
  handler(value, options, key, message, attributes) {
    if ( value && typeof value !== 'string') {
      return message.format({
        attribute: key
      });
    }
  }
}
