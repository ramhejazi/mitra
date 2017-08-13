module.exports = {
	title: 'required_if',
	description: 'Element is required when another attribute is equal to the specified value.',
	valids: [
		{ value: 'value', options: 'bar=hey', attributes: { bar: 'hey' } }
	],
	invalids: [
		{ value: undefined, options: 'bar=hey', attributes: { bar: 'hey' } }
	],
	handler(value, options, key, message, attributes) {
		let { targetKey, targetValue } = options.split('=');
		let targetAttrValue = attributes[targetKey];
		if (targetAttrValue === targetValue ) {
			if (
				value === undefined
				|| value === null
				|| (typeof value === 'string' && value.trim().length === 0)
			) {
				return message.format({
					attribute: key,
					other: targetKey,
					value: targetValue
				});
			}
		}
	}
};
