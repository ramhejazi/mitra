const helpers = require('../lib/util');
const path = require('path');
const vPath = path.join(__dirname, '../validators');
const mitra = require('../index');
const fs = require('fs');
const fakeMessage = require('../lib/Message')(
	{ en: { messages: { fake: 'this is a message!'} } },
	'fake', 'en'
);

fs.readdirSync(vPath).forEach(file => {
	const name = path.basename(file, '.js');
	const src = require(path.join(vPath, file));
	const validator = src.handler;
	const { invalids, valids} = src;
	if ( !invalids && !valids ) return;
	describe(`Validator ${name}`, function() {
		if ( valids ) {
			it('should pass for valid values', function(fn) {
				let message;
				valids.some(el => {
					el = helpers.getType(el) !== 'object' ? { value: el } : el;
					let { value, attributes, key, options } = el;
					let res = validator.call(mitra, value, options, key, fakeMessage, attributes);
					if ( res ) {
						message = res;
						return true;
					}
					return false;
				});
				if ( message ) fn(new Error(message));
				else fn();
			});
		}
		if ( invalids ) {
			it('should not pass for invalid values', function(fn) {
				let message;
				invalids.some(el => {
					el = helpers.getType(el) !== 'object' ? { value: el } : el;
					let { value, attributes, key, options } = el;
					let res = validator.call(mitra, value, options, key, fakeMessage, attributes);
					if ( !res ) {
						message = `validator ${name} should not pass for invalid value: ${value}`;
						return true;
					}
					return false;
				});
				if ( message ) fn(new Error(message));
				else fn();
			});
		}
	});
});
