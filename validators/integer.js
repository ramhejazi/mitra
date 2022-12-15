function isInteger(value) {
    return (
        typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value
    );
}

module.exports = {
    title: 'integer',
    description: 'Value (number) must be an integer.',
    handler(value, options, key) {
        if (typeof value === 'number' && !isInteger(value)) {
            return `Property "${key}" must be an integer.`
        }
    },
};
