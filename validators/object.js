const _ = require('lodash');

module.exports = {
	name: 'object',
	description: 'Value must be a plain `object`.',
	checks: 'any',
	valids: [
		{
			value: {}
		}
	],
	invalids: [ Object, undefined ],
	handler(value, options, key, message) {
		if (!_.isPlainObject(value)) {
			return message.format({
				attribute: key
			});
		}
	}
};
