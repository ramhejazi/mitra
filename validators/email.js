
/**
 * validator: email
 * checks that a value is a valid email address
 */

const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

module.exports = {
  name: 'email',
  description: 'Element should be a valid email address.',
  handler(value, options, key, message, attributes) {
    if ( value && !regex.test(value) ) {
        return message.format({
        	attribute: key,
        	value
        });
    }
  }
};
