module.exports = {
	title: 'range',
	description: 'Value (number) must be in range, inclusive.',
	checks: 'number',
	valids: [
		{ value: 5, options: '3,6' },
		{ value: 3, options: [3,'6'] }
	],
	invalids: [
		{ value: 5, options: '6,8' },
		{ value: 3, options: [4,'6'] }
	],
	handler(value, options, key, message) {
		const [min, max] = typeof options === 'string' ? options.split(',') : options;
		if (typeof value === 'number') {
			if (value < +min || value > +max) {
				return message.format({
					attribute: key,
					min,
					max
				});
			}
		}
	}
};
