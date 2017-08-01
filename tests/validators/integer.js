const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#integer', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
        number: -1,
    		foo: 4000,
        baz: undefined
    	}, {
    		number: 'integer',
    		foo: 'integer',
    		baz: 'integer'
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		number: '501d',
        foo: '-32',
        bar: 2.3
    	}, {
    		number: 'integer',
        foo: 'integer',
        bar: 'integer'
    	}).then(r => fn(new Error('it should not pass'))).catch(res => {
    		expect(res.errors.number[0]).to.be('The number must be an integer.');
        expect(res.errors.bar[0]).to.be('The bar must be an integer.');
    		fn();
    	});
    });
});
