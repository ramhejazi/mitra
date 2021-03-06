module.exports = {
	name: 'confirmed',
	description: 'Checks equality between 2 attributes\' value, i.e. useful for checking password confirmation fields.',
	checks: 'any',
	valids: [
		{
			value: 'value',
			key: 'password',
			attributes: {
				password_confirmation: 'value'
			}
		}
	],
	invalids: [
		{
			value: 'value',
			key: 'password',
			attributes: {
				password_confirmation: 'different_value'
			}
		}
	],
	handler(value, options, key, message, attributes) {
		let targetAttr = options ? options : `${key}_confirmation`;
		console.log(targetAttr);
		let targetValue = attributes[targetAttr];
		if (value !== targetValue) {
			return message.format({
				'attribute': key
			});
		}
	}
};
