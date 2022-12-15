module.exports = {
    title: 'min',
    description:
        'Value (number) should be equal or more than specified minimum value.',
    chceks: 'number',
    valids: [
        { value: 1442.504, options: 1200 },
        { value: undefined, options: 2 },
    ],
    invalids: [{ value: 5, options: 10 }],
    handler(value, options, key, message, attributes) {
        let min =
            typeof options === 'string' && options.indexOf('$') === 0
                ? attributes[options.slice(1)]
                : +options;
        if (typeof value === 'number' && value < min) {
            return `Property "${key}" may not be smaller than "${min}."`;
        }
    },
};
