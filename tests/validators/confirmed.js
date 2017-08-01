const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#confirmed', function() {
    it('should succeed for valid values', function() {
    	return mitra.validate({
    		password: '400',
    		password_confirmation: '400',
            foo: 'value',
            bar: 'value'
    	}, {
    	 password: 'confirmed',
       foo: 'confirmed:bar'
    	});
    });
    it('should fail for invalid values', function(fn) {
    	mitra.validate({
    		password: 'avalue',
    		password_confirmation: 'anothervalue'
    	}, {
    		password: 'confirmed',
    	}).then(r => fn(new Error('Passed for invalid data!'))).catch(res => {
    		expect(res.errors.password[0]).to.be('The password confirmation does not match.');
    		fn();
    	});
    });
});
