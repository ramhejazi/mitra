module.exports = {
    messages: {
        type: 'The ${attribute} must have one of the following types: ${valid_types}',
        required_if:
            'The ${attribute} field is required when ${other} is ${value}.',
        email: 'The ${attribute} must be a valid email address.',
        confirmed: 'The ${attribute} confirmation does not match.',
        url: 'The ${attribute} format is invalid.',
        in: 'The selected ${attribute} is invalid.',
        regex: 'The ${attribute} format is invalid.',
        number: 'The ${attribute} must be a number.',
        range: 'The ${attribute} must be between ${min} and ${max}.',
        max_length:
            'The ${attribute} must not have more than ${max} characters.',
        min_length: 'The ${attribute} must be at least ${min} characters.',
    },
    attributes: {},
};
