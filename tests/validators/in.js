const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#in', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
    		number: '8',
    		foo: 'avalue'
    	}, {
    		number: 'in:8',
    		foo: 'in:bar,avalue',
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		number: '600',
    	}, {
    		number: 'in:500,800',
    	}).then(r => fn(new Error('it should not pass'))).catch(res => {
    		expect(res.errors.number[0]).to.be('The selected number is invalid.');
    		fn();
    	});
    });
});
