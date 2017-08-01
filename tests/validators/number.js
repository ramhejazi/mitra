const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#number', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
        number: -1,
    		foo: 4000,
    	}, {
    		number: 'number',
    		foo: 'number',
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		number: '501d',
    		foo: '-32'
    	}, {
    		number: 'number',
        foo: 'number'
    	}).then(r => fn(new Error('it should not pass'))).catch(res => {
    		expect(res.errors.number[0]).to.be('The number must be a number.');
    		fn();
    	});
    });
});
