module.exports = {
    title: 'in',
    description: 'Value must one of the allowed options.',
    checks: 'any',
    handler(value, options, key) {
        let parts = typeof options === 'string' ? options.split(',') : options;
        if (parts.indexOf(value) === -1) {
            return `Property "${key}" should be one of these values: ${options.join(', ')}`
        }
    },
};
