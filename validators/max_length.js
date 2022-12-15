module.exports = {
    title: 'max_length',
    description:
        'Length of the value should be equal or less than specified maximum length.',
    handler(value, options, key) {
        if (Array.isArray(value) && value.length > +options) {
            return `Property ${key} must have at most ${options} items.`;
        } else if (typeof value === 'string' && value.length > +options) {
            return `Property ${key} must have at most ${options} characters.`;
        }
    },
};
