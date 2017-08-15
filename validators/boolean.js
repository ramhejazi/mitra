module.exports = {
	name: 'boolean',
	description: 'Value must be a `boolean` value, i.e. `true` or `false`.',
	checks: 'any',
	valids: [
		true,
		false,
	],
	invalids: [
		'true',
		[],
		null
	],
	handler(value, options, key, message) {
		if (typeof value !== 'boolean') {
			return message.format({
				attribute: key
			});
		}
	}
};
