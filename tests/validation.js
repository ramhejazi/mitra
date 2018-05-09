const expect = require('expect.js');
const mitra = require('../index');

describe('mitra#validate', function() {
	it('should succeed for valid values', function(fn) {
		mitra.validate({
			// values
			'title': 'this is a title|max:5',
			'website': 'http://foo.com',
			'description': 'required'
		}, {
			// rules
			'title': 'required',
			'website': 'url',
			'description': 'required'
		}).then(function(res) {
			expect(res.title).to.eql([undefined]);
			expect(res).to.only.have.keys('title', 'website', 'description');
			fn();
		}).catch(fn);
	});
	it('should fail for invalid values', function(fn) {
		mitra.validate({
			// values
			'title': undefined,
			'website': 'http://foo.com',
			'description': '...'
		}, {
			// rules
			'title': 'required',
			'website': 'url',
			'description': 'required'
		}).then(() => fn('Passed for invalid data!')).catch((e) => {
			expect(e.errors.title).to.eql(['The title field is required.']);
			expect(e.errors.website).to.eql(undefined);
			expect(e.errors.description).to.eql(undefined);
			fn();
		});
	});
});

describe('mitra#check', function() {
	it('should succeed for valid values', function() {
		return mitra.check('a string', 'string', null, 'identifier').then(result => {
			expect(result.valid).to.be(true);
			expect(result.message).to.be(undefined);
		});
	});
	it('should fail for invalid values', function() {
		mitra.check('a string', 'object', null, 'identifier').then(result => {
			expect(result.valid).to.be(false);
			expect(result.message).to.eql('The identifier must be an object.');
		});
	});
});


describe('mitra#addAlias', function() {
	it('should add an alias successfully', function() {
		mitra.addAlias('an_alias', 'required|min_length:20');
		expect(mitra.getAlias('an_alias')).to.eql({
			required: true,
			min_length: '20'
		});
	});
});
