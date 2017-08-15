module.exports = {
	name: 'string',
	description: 'Value must be a `string`.',
	checks: 'any',
	valids: [ 'string', '' ],
	invalids: [ {}, null, undefined, 4 ],
	handler(value, options, key, message) {
		if (typeof value !== 'string') {
			return message.format({
				attribute: key
			});
		}
	}
};
