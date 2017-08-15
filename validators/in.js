module.exports = {
	title: 'in',
	description: 'Element must one of the allowed options.',
	checks: 'any',
	valids: [
		{
			value: '8',
			options: '8,9,4'
		},
		{
			value: 8,
			options: ['9', 8, undefined]
		}
	],
	invalids: [
		{
			value: '8',
			options: [8, 'foo']
		},
		{
			value: '3',
			options: ' 3'
		}
	],
	handler(value, options, key, message) {
		let parts = typeof options === 'string' ? options.split(',') : options;
		if ( parts.indexOf(value) === -1 ) {
			return message.format({
				attribute: key,
				'in': options
			});
		}
	},
};
