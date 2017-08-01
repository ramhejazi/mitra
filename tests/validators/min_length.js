const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#min_length', function() {
    it('should succeed for valid values', function() {
        return mitra.validate({
            str: 'thisissdsddsd',
            foo: '22sddddddddddddddsdsddsdsd',
            bar: undefined,
        }, {
            str: 'min_length:10',
            foo: 'min_length:15',
            bar: 'min_length:2'
        });
    });
    it('should fail for invalid values', function(fn) {
        mitra.validate({
            str: 'This is a short string that should fail',
            foo: '       '
        }, {
            str: 'min_length:100',
            foo: 'min_length:4'
        }).then(r => fn(new Error('it should not pass'))).catch(res => {
            expect(res.errors.str[0]).to.be('The str must be at least 100 characters.');
            fn();
        });
    });
});
