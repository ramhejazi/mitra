const expect = require('expect.js');
const mitra = require('../mitra');

describe('mitra#validate', function () {
    it('should succeed for valid values', function () {
        let data = {
            title: 'this is a title',
            website: 'http://foo.com',
            arr: [1, 2],
            description: 'this is the description',
        };
        let validator = mitra.make_validator({
            title: 'required|type:string',
            website: 'url',
            arr: 'type:array|max_length:2|min_length:2',
            description: 'required',
        });
        let res = validator(data, false);
        expect(res.valid).to.eql(true);
        expect(res.errors.length).to.eql(0);
    });

    it('should fail for invalid values', function () {
        let validator = mitra.make_validator({
            // rules
            title: 'required',
            website: 'url',
            description: 'required',
            names: 'min_length:5',
        });

        let res = validator(
            {
                website: 'http://foo.com',
                description: '...',
                names: [3, 4, 5],
            },
            false
        );
        expect(res.invalids).eql(['title', 'names']);
        expect(res.valids).eql(['website', 'description']);
        expect(res.errors.length).to.eql(2);
    });
});


describe('util#normalize_rules', function () {
    it('should convert the rules correctly', function () {
        let rules1 = mitra.normalize_rules({
            param1: 'required',
            param2: {
                required: true,
                min: 10,
            },
        });

        expect(rules1).to.eql({
            param1: [
                {
                    rule: 'required',
                    options: true,
                },
            ],
            param2: [
                {
                    rule: 'required',
                    options: true,
                },
                {
                    rule: 'min',
                    options: 10,
                },
            ],
        });

        let rules2 = mitra.normalize_rules({
            title: 'required',
            budget: 'min:10',
            website: 'url',
            password: {
                confirmed: 'bar',
            },
            description: {
                required: true,
                min_length: 1000,
            },
        });
        expect(rules2).to.eql({
            password: [{ rule: 'confirmed', options: 'bar' }],
            title: [
                {
                    rule: 'required',
                    options: true,
                },
            ],
            budget: [
                {
                    rule: 'min',
                    options: '10',
                },
            ],
            website: [
                {
                    rule: 'url',
                    options: true,
                },
            ],
            description: [
                {
                    rule: 'required',
                    options: true,
                },
                { rule: 'min_length', options: 1000 },
            ],
        });
    });
});

describe('is', function () {
    it('should validate properly', function () {
        let data = function () {};
        const { is } = mitra;
        expect(is(data, 'type:function')).to.be(true);
        expect(is(data, 'type:array'), false);
        expect(is(data, 'type:function,array')).to.be(true);
        expect(is('test', 'type:array,string|min_length:3')).to.be(true);
        expect(is('test', 'type:array,string|max_length:2')).to.be(false);
        expect(is({}, 'type:array,object')).to.be(true);
        expect(is(3, 'type:array,number')).to.be(true);
        expect(is(3, 'type:array,string')).to.be(false);
    });
});
