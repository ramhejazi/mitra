const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

module.exports = {
    name: 'email',
    description: 'Value should be a valid email address.',
    handler(value, options, key) {
        if (typeof value === 'string' && !regex.test(value)) {
            return `Property ${key} must be a valid email address.`
        }
    },
};
