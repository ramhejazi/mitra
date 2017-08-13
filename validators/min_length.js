module.exports = {
	title: 'min_length',
	description: 'Checks minimum length of an element, either an array or a string',
	valids: [
		{
			value: 'this is a string',
			options: 3
		},
		{
			value: undefined,
			options: 100
		}
	],
	invalids: [
		{
			value: 'this is a string',
			options: 100
		},
	],
	handler(value, options, key, message) {
		if (value && (typeof value !== 'string' || value.trim().length < +options)) {
			return message.format({
				attribute: key,
				min: options
			});
		}
	}
};
