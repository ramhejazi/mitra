const expect = require('expect.js');
const util = require('../lib/util');
const mitra = require('../index');

describe('util#normalizeConstaints', function() {
	it('should convert the rules correctly', function() {
		let rules1 = util.normalizeConstraints({
			param1: 'required',
			param2: {
				required: true,
				min: 10
			}
		});

		expect(rules1).to.eql({
			param1: {
				required: true
			},
			param2: {
				required: true,
				min: 10
			}
		});

		mitra.addAlias('test_alias', 'required|max_length:3');
		mitra.addAlias('test_alias2', 'boolean|min_length:3');
		let rules2 = util.normalizeConstraints({
			'title': 'required',
			'budget': 'min:10',
			'website': 'url',
			'foo': 'test_alias|max:20',
			'password': {
				confirmed: 'bar'
			},
			'description': {
				required: true,
				min_length: 1000
			}
		}, mitra._aliases);
		expect(rules2).to.eql({
			password: {
				confirmed: 'bar'
			},
			title: {
				required: true
			},
			budget: {
				min: '10'
			},
			website: {
				url: true
			},
			foo: {
				required: true,
				max: '20',
				max_length: '3'
			},
			description: {
				required: true,
				min_length: 1000
			}
		});
	});
});
