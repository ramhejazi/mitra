const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#null', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
    		param: null,
    	}, {
    	  param: 'null',
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		param: {},
        param2: '[3]'
    	}, {
        param: 'null',
        param2: 'null',
    	}).then(r => fn(new Error('Passed for invalid data!'))).catch(res => {
    		expect(res.errors.param[0]).to.be('The param must be null.');
    		fn();
    	});
    });
});
