module.exports = {
    title: 'min_length',
    description:
        'Length of the value should be equal or more than specified minimum length.',
    handler(value, options, key) {
        if (Array.isArray(value) && value.length < +options) {
            return `Property ${key} must have at least ${options} items.`;
        } else if (typeof value === 'string' && value.length < +options) {
            return `Property ${key} must have at least ${options} characters.`;
        }
    },
};
