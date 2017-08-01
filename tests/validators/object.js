const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#object', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
    		param: {},
    	}, {
    	  param: 'object',
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		param: [],
        param2: '[3]'
    	}, {
        param: 'object',
        param2: 'object',
    	}).then(r => fn(new Error('Passed for invalid data!'))).catch(res => {
    		expect(res.errors.param[0]).to.be('The param must be an object.');
    		fn();
    	});
    });
});
