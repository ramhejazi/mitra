module.exports = {
	title: 'numeric',
	description: 'Value must be a `number`.',
	checks: 'any',
	valids: [Infinity, 0, 1.2],
	invalids: ['3', undefined, null],
	handler(value, options, key, message) {
		if (typeof value !== 'number') {
			return message.format({
				attribute: key
			});
		}
	}
};
