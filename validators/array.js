module.exports = {
	name: 'array',
	description: 'Value must be an `array`.',
	checks: 'any',
	valids: [
		[],
		['value'],
	],
	invalids: [
		'foobar',
		'[]',
		null
	],
	handler(value, options, key, message) {
		if (!Array.isArray(value)) {
			return message.format({
				attribute: key
			});
		}
	}
};
