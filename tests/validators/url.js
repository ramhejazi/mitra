const mitra = require('../../index');
const expect = require('expect.js');

describe('validators#url', function() {
    it('should return a valid message for error', function(fn) {
        mitra.validate({
            url: 'invalid'
        }, {
            url: 'url'
        }).catch(res => {
            expect(res.errors.url[0]).to.be('The url format is invalid.')
            fn();
        })
    })
});
