function isInteger(value) {
	return typeof value === 'number' &&
		isFinite(value) &&
		Math.floor(value) === value;
}

module.exports = {
	title: 'integer',
	description: 'Element (number) must be an integer.',
	checks: 'number',
	valids: [
		-1, undefined, 39
	],
	invalids: [
		1.2, '3', null, []
	],
	handler(value, options, key, message) {
		if (typeof value === 'number' && !isInteger(value)) {
			return message.format({
				attribute: key
			});
		}
	}
};
