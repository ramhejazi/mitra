module.exports = {
	name: 'null',
	description: 'Value must be `null`.',
	checks: 'any',
	handler(value, options, key, message) {
		if (value !== null) {
			return message.format({
				attribute: key
			});
		}
	}
};
