module.exports = {
	title: 'min_length',
	description: 'Length of the value should be equal or more than specified minimum length.',
	checks: ['string', 'array'],
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
