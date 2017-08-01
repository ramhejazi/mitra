const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#email', function() {
    it('should succeed for valid values', function() {
        let m = mitra._validators.email.handler;
        [
            'htmlapck@dkd.com',
            'foob@ar.co.ir',
            'foo.var@ffd.net',
            'hehw63782h@foo.co.ir',
            undefined,
            null
        ].forEach(el => {
            expect(m).withArgs(el, null, null, '').to.not.throwException();
        });
    });
    it('should throw errors for invalid values', function() {
        let m = mitra._validators.email.handler;
        [
            '..@dd.com',
            'hellow.@.com',
            'https://23dsdsd',
        ].forEach(el => {
            expect(m).withArgs(el, null, null, '').to.throwException();
        });
    });
    it('should return a valid message for error', function(fn) {
        mitra.validate({
            email: '.ds.'
        }, {
            email: 'email'
        }).catch(res => {
            expect(res.errors.email[0]).to.be('The email must be a valid email address.')
            fn();
        })
    })
});
