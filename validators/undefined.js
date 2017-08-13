module.exports = {
	name: 'undefined',
	description: 'Value must be `undefined`.',
	valids: [undefined],
	invalids: [3, 'string', [], null],
	handler(value, options, key, message) {
		if (value !== undefined) {
			return message.format({
				attribute: key
			});
		}
	}
};
