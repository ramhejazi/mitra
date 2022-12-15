module.exports = {
    name: 'required',
    description: 'Value must not be `undefined`, `null`, or an empty string.',
    checks: 'any',
    valids: ['value', 3, 0, 9.4, [], 'undefined', -2],
    invalids: [' ', null, undefined],
    handler(value, options, key) {
        if (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim().length === 0)
        ) {
            return `Property ${key} is required.`
        }
    },
};
