/**
 * validator: equals
 * checks that a value is a valid mobile phone Number
 * it does check having a strict length
 */

module.exports = {
  name: 'confirmed',
  description: 'Checks matching between 2 attributes',
  handler(value, options, key, message, attributes) {
    let targetAttr = options !== true ? options : `${key}_confirmation`;
    let targetValue = attributes[targetAttr];
    if ( value !== targetValue ) {
        return message.format({
            'attribute': key
        });
    }
  }
}
