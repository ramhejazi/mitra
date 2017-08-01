module.exports = {
    title: 'range',
    description: 'Element (number) must be between 2 numbers.',
    handler(value, options, key, message, attributes) {
        const [min, max] = options.split(',');
        if (typeof value === 'number') {
            if (value < +min || value > +max) {
                return message.format({
                    attribute: key,
                    min,
                    max
                });
            }
        }
    }
}
