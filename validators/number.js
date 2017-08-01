module.exports = {
    title: 'numeric',
    description: 'Element must be a number.',
    handler(value, options, key, message, attributes) {
        if (typeof value !== 'number') {
            return message.format({
                attribute: key
            });
        }
    }
}
