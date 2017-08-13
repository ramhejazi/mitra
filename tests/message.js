const MessageFactory = require('../lib/Message');
const expect = require('expect.js');

describe('Message', function() {
	it('should work properly', function() {
		const message = MessageFactory({
			en: {
				messages: {
					'required': 'The field ${attribute} is required. ${test}'
				},
				attributes: {
					'user_name': 'user name'
				}
			}
		}, 'required', 'en');
		const formattedMessage = message.format({
			attribute: 'user_name',
			test: 'Son!'
		});
		expect(formattedMessage).to.eql('The field user name is required. Son!');
	});
});
