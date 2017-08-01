const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#array', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
    		param: [],
    	}, {
    	  param: 'array',
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		param: {},
        param2: '[3]'
    	}, {
        param: 'array',
        param2: 'array',
    	}).then(r => fn(new Error('Passed for invalid data!'))).catch(res => {
    		expect(res.errors.param[0]).to.be('The param must be an array.');
    		fn();
    	});
    });
});
