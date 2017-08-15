module.exports = {
	title: 'max_length',
	description: 'Length of the value should be equal or less than specified maximum length.',
	checks: ['string', 'array'],
	valids: [
		{
			value: 'this is a string',
			options: 100
		},
		{
			value: undefined,
			options: 100
		}
	],
	invalids: [
		{
			value: 'this is a string',
			options: 8
		},
	],
	handler(value, options, key, message) {
		if ((typeof value === 'string' || Array.isArray(value)) && value.length > +options) {
			return message.format({
				attribute: key,
				max: options
			});
		}
	}
};
