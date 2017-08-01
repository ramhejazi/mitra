module.exports = {
    title: 'min',
    description: 'Element (number) should be equal or more than min.',
    handler(value, options, key, message, attributes) {
        let min = options.indexOf('$') === 0 ? attributes[options.slice(1)] : +options;
        if (typeof value === 'number' && value < min ) {
            return message.format({
                attribute: key,
                min
            });
        }
    }
}
