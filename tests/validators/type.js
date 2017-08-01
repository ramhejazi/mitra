const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#type', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
    		param: 'value',
        param2: true,
    	}, {
        param: 'type:string,array',
        param2: 'type:boolean',
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		param: {},
        param2: 3
    	}, {
        param: 'type:string,array',
        param2: 'type:boolean',
    	}).then(r => fn(new Error('Passed for invalid data!'))).catch(res => {
        expect(res.errors.param[0]).to.be('The param must have one of the following types: string, array');
        expect(res.errors.param2[0]).to.be('The param2 must have one of the following types: boolean');
    		fn();
    	});
    });
});
