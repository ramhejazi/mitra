const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#required', function() {
    it('should succeed for valid values', function() {
        return mitra.validate({
            // values
            'title': 'dsdsd',
        }, {
            // rules
            'title': 'required',
        }).then(function(res) {
            expect(res.title).to.eql([undefined]);
        });
    });
    it('should fail for non-existent values', function() {
        return mitra.validate({}, {
            // rules
            'title': 'required',
        }).then(res => {
            fn( new Error('It should not pass!') );
        }).catch(function(res) {
            expect(res.errors.title[0]).to.be.a('string');
        });
    });
    it('should fail for empty strings', function() {
        return mitra.validate({
            email: '',
            password: '   '
        }, {
            // rules
            'email': 'required',
            "password": 'required'
        }).then(res => {
            throw new Error('It should not pass!');
        }).catch(function(res) {
            expect(res.errors.email[0]).to.be('The email field is required.');
            expect(res.errors.password[0]).to.be('The password field is required.');
        });
    });
});
