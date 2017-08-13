function toString() {
	return this._message;
}

function translateAttr(attr) {
	return (this._langObj.attributes || {})[attr] || attr;
}

function format(params) {
	this._message = this._message.replace(/\$\{(\w+)\}/g, (_, match) => {
		if (match === 'attribute') {
			return this.translateAttr(params[match]);
		}
		return params[match] || match;
	});
	return this._message;
}

module.exports = function Message(messages = {}, rule, lang) {
	let langObj = messages[lang];
	const message = langObj.messages[rule] || `${rule} general message`;
	return {
		_rule: rule,
		_lang: lang,
		_langObj: langObj,
		_allMessages: messages,
		_message: message,
		toString,
		format,
		translateAttr
	};
};
