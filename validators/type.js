module.exports = {
	name: 'type',
	description: 'Value must have one of the specified JavaScript types.',
	checks: 'any',
	valids: [
		{ value: '', options: ['string', 'number'] },
		{ value: '', options: 'string' },
		{ value: 3, options: 'number,string' }
	],
	invalids: [
		{ value: 4, options: 'string,undefined' }
	],
	handler(value, options, attr, message) {
		let types = typeof options === 'string' ? options.split(',') : options;
		const passes = types.some(type => {
			return this.check(value, type).valid;
		});
		if (!passes) {
			return message.format({
				attribute: attr,
				valid_types: options
			});
		}
	}
};
