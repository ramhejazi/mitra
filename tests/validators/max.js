const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#max', function() {
    it('should succeed for valid values', function() {
        return mitra.validate({
            number: '32302',
            foo: 4000
        }, {
            number: 'max:32302',
            foo: 'min:4000',
            baz: 'min:219012'
        });
    });
    it('should fail for invalid values', function() {
        return mitra.validate({
            number: 3096,
            foo: 3094
        }, {
            number: 'max:$foo',
            foo: 'max:22'
        }).then(r => { throw new Error('it should not pass') }).catch(res => {
            expect(res.errors.number[0]).to.be('The number may not be greater than 3094.');
        });
    });
});
