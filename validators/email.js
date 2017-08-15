const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

module.exports = {
	name: 'email',
	description: 'Element should be a valid email address.',
	checks: 'string',
	valids: [
		'htmlapck@dkd.com',
		'foob@ar.co.ir',
		'foo.var@ffd.net',
		'hehw63782h@foo.co.ir',
		undefined,
		null
	],
	invalids: [
		[],
		'..@dd.com',
		'hellow.@.com',
		'https://23dsdsd',
	],
	handler(value, options, key, message) {
		if (typeof value === 'string' && !regex.test(value)) {
			return message.format({
				attribute: key,
				value
			});
		}
	}
};
