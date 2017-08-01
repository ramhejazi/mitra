const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#required_if', function() {
    it('should succeed for valid values', function() {
        return mitra.validate({
            // values
            'title': 'dsdsd',
            'bar': 'hey'
        }, {
            // rules
            'title': 'required_if:bar,hey',
        }).then(function(res) {
            expect(res.title).to.eql([undefined]);
        });
    });
    it('should fail for non-existent values', function() {
        mitra.validate({
            bar: 'hey'
        }, {
            // rules
            'title': 'required_if:bar,hey',
        }).then(res => {
            throw new Error('It should not pass!');
        }).catch(function(res) {
            expect(res.errors.title[0]).to.be('The title field is required when bar is hey.');
        });
    });
    it('should fail for empty strings', function(fn) {
        mitra.validate({
            email: '',
            password: 'bar'
        }, {
            // rules
            'email': 'required_if:password,bar',
        }).then(res => {
            fn(new Error('Passed for invalid data!'));
        }).catch(function(res) {
            expect(res.errors.email[0]).to.be('The email field is required when password is bar.');
            fn();
        });
    });
});
