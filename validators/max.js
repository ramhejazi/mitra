module.exports = {
	title: 'max',
	description: 'Element (number) should be equal or less than specified max value.',
	valids: [
		{ value: 300, options: 301 },
		{ value: undefined, options: 400 },
		{ value: 10, options: 10 }
	],
	invalids: [
		{ value: 20, options: 19 }
	],
	handler(value, options, key, message, attributes) {
		let max = (typeof options === 'string' && options.indexOf('$') === 0) ? attributes[options.slice(1)] : +options;
		if (typeof value === 'number' && value > max) {
			return message.format({
				attribute: key,
				max
			});
		}
	}
};
