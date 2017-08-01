const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#max_length', function() {
    it('should succeed for valid values', function() {
        return mitra.validate({
            str: 'thisis',
            foo: '22',
            bar: undefined,
        }, {
            str: 'max_length:100',
            foo: 'max_length:3',
            bar: 'max_length:2'
        });
    });
    it('should fail for invalid values', function(fn) {
        mitra.validate({
            str: 'This is a long string that should fail',
            foo: '       '
        }, {
            str: 'max_length:10',
            foo: 'max:4'
        }).then(r => fn(new Error('it should not pass'))).catch(res => {
            expect(res.errors.str[0]).to.be('The str must not have more than 10 characters.');
            fn();
        });
    });
});
