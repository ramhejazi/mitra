function isInteger(value) {
    return typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value;
}

module.exports = {
    title: 'integer',
    description: 'Element (number) must be an integer.',
    handler(value, options, key, message, attributes) {
        if (typeof value !== 'undefined' && !isInteger(value)) {
            return message.format({
                attribute: key
            });
        }
    }
}
