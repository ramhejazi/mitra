/**
 * validator: min_length
 * it throws error for strings that are less than specified max length
 */
module.exports = {
    title: 'min_length',
    description: 'Checks minimum length of an element, either an array or a string',
    handler(value, options, key, message, attributes) {
        if (value && (typeof value !== 'string' || value.trim().length < +options)) {
            return message.format({
                attribute: key,
                min: options
            });
        }
    }
}
