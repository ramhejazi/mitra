const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#range', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
        number: -1,
    		foo: 4000,
        baz: undefined
    	}, {
    		number: 'range:-3,8',
    		foo: 'range:4000,4002',
    		baz: 'range:32,332'
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		number: 4,
        foo: -6.4,
        bar: 2.3
    	}, {
    		number: 'range:5,6',
        foo: 'range:-531,-43',
        bar: 'range:3,7'
    	}).then(r => fn(new Error('it should not pass'))).catch(res => {
    		expect(res.errors.number[0]).to.be('The number must be between 5 and 6.');
        expect(res.errors.foo[0]).to.be('The foo must be between -531 and -43.');
    		fn();
    	});
    });
});
