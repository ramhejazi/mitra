const _ = require('lodash');

 module.exports = {
    title: 'required_if',
    description: 'Element is required when another attribute is equal to the specified value.',
    handler(value, options, key, message, attributes) {
      let parts = options.split(',');
      let targetValue = attributes[ parts[0] ];
      let targetValidValues = parts.slice(1);
      if ( targetValidValues.includes(targetValue) && _.toString(value).trim().length === 0 ) {
          return message.format({
            attribute: key,
            other: parts[0],
            value: targetValue
          });
      }
    }
}
