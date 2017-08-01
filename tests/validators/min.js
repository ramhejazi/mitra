const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#min', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
    		number: 1442.504,
    		foo: 4000
    	}, {
    		number: 'min:1000',
    		foo: 'min:4000',
    		baz: 'min:219012'
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		number: 4,
    		foo: 5
    	}, {
    		number: 'min:1000',
    	}).then(r => fn(new Error('it should not pass'))).catch(res => {
    		expect(res.errors.number[0]).to.be('The number must be at least 1000.');
    		fn();
    	});
    });
});
