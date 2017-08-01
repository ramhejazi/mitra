const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#boolean', function() {
	it('should succeed for valid values', function() {
		return mitra.validate({
			param: true,
			param2: false
		}, {
			param: 'boolean',
			param2: 'boolean',
		});
	});
	it('should fail for invalid values', function(fn) {
		mitra.validate({
			param: {},
			param2: '[3]'
		}, {
			param: 'boolean',
			param2: 'boolean',
		}).then(r => fn(new Error('Passed for invalid data!'))).catch(res => {
			expect(res.errors.param[0]).to.be('The param must be a boolean.');
			fn();
		});
	});
});
