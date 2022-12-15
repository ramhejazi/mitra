module.exports = {
    title: 'max',
    description:
        'Value (number) should be equal or less than specified max value.',
    handler(value, options, key, message, attributes) {
        let max =
            typeof options === 'string' && options.indexOf('$') === 0
                ? attributes[options.slice(1)]
                : +options;
        if (typeof value === 'number' && value > max) {
            return `Property "${key}" may not be greater than "${max}."`;
        }
    },
};
