const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#string', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
    		param: 'value',
    	}, {
    	  param: 'string',
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		param: {},
        param2: 3
    	}, {
        param: 'string',
        param2: 'string',
    	}).then(r => fn(new Error('Passed for invalid data!'))).catch(res => {
        expect(res.errors.param[0]).to.be('The param must be a string.');
        expect(res.errors.param2[0]).to.be('The param2 must be a string.');
    		fn();
    	});
    });
});
