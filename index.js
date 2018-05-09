const Promise = require('bluebird');
const path = require('path');
const util = require('./lib/util');
const _ = require('lodash');
const Message = require('./lib/Message');
const ValidationError = require('./lib/ValidationError');
const validatorsPath = path.join(__dirname, './validators');

const mitra = {
	_lang: 'en',
	_messages: {},
	_aliases: {},
	_validators: {},

	setDefaultLang(lang) {
		this._lang = lang;
	},

	normalizeRules(spec) {
		return util.normalizeConstraints(spec, this._aliases);
	},

	/**
	 * Add a localization
	 * @param {string} lang - name of the language
	 * @param {object} params the localization object
	 * @param {object} params.messages - error messages, keys must be validation name and value an error message
	 * @param {object} params.attributes user-friendly attributes
	 */
	addLang(lang, params) {
		if (!_.isString(lang)) throw '"lang" parameter must be a string.';
		if (!_.isObject(params)) throw '"params" parameter must be an object.';
		if (!_.isObject(params.messages)) throw '"params" parameter must have a "messages" object property.';

		if (_.isObject(this._messages[lang])) {
			_.extend(this._messages[lang], params);
			return;
		}
		this._messages[lang] = params;
	},

	/**
	 * Load validation rules from a directory
	 * @param  {string|array} path - absolute path(s) of directories
	 * @return {[type]}      [description]
	 */
	addValidators(path) {
		util.loadDirFiles(path).forEach(file => {
			this.extendFromFile(file);
		});
	},

	extendFromFile(file) {
		if (!_.isPlainObject(file.contents))
			throw `The validator must be a plain object. Path: ${file.path}`;

		if (!_.isFunction(file.contents.handler))
			throw `The validator must have a 'handler' function. Path: ${file.path}`;

		if (this._validators.hasOwnProperty(file.name))
			throw `Validator "${file.name}" already exists!. Path: ${file.path}`;

		this._validators[file.name] = file.contents;
	},

	addAlias(name, _constraints, override = false) {
		if (typeof name !== 'string' || name.trim().length === 0) {
			throw new Error('Alias name is invalid!');
		}
		if (this._aliases[name] && !override) {
			throw new Error(`Duplicate alias name: "${name}"`);
		}
		if (this._validators[name]) {
			throw new Error(`Alias name is invalid. There is a validator called "${name}".`);
		}

		let constraints = this.normalizeRules(_constraints);
		_.keys(constraints).forEach(validatorName => {
			if (!this._validators[validatorName]) {
				throw new Error(`
          There is no validator named ${validatorName}!
          Alias named "${name}" has invalid constraints!`);
			}
		});
		this._aliases[name] = constraints;
	},

	getAlias(name) {
		return this._aliases[name];
	},

	checkSync(value, rule, options, attr, data, lang) {
		let validator = this._validators[rule];
		if (!validator) throw new Error(`Unknown validator: ${rule}`);
		const message = Message(this._messages, rule, lang || this._lang);
		let errorMsg = validator.handler.call(this, value, options, attr, message, data);
		if (errorMsg) {
			return {
				valid: false,
				message: errorMsg
			};
		}
		return {
			valid: true,
			message: undefined
		};
	},

	check(value, rule, options, attr, data, lang) {
		let validator = this._validators[rule];
		if (!validator) throw new Error(`Unknown validator: ${rule}`);
		const message = Message(this._messages, rule, lang || this._lang);
		let handlerReturnValue = validator.handler.call(this, value, options, attr, message, data);
		return Promise.resolve(handlerReturnValue).then(errorMsg => {
			if (errorMsg) {
				return {
					valid: false,
					message: errorMsg
				};
			}
			return {
				valid: true,
				message: undefined
			};
		});
	},

	/**
	 * Validate!
	 * @param  {Object} [data={}]   user data
	 * @param  {object} constraints
	 * @param  {string|undefined} lang
	 * @return {Promise}
	 */
	validate: Promise.method(function(data = {}, constraints, lang) {
		lang = lang || this._lang;
		constraints = this.normalizeRules(constraints);
		let validations = _.keys(constraints).reduce((ret, attr) => {
			let value = _.get(data, attr);
			let attrRules = constraints[attr];
			ret[attr] = Promise.map(_.keys(attrRules), rule => {
				let options = attrRules[rule];
				return this.check(value, rule, options, attr, data, lang).then(result => {
					if (!result.valid) {
						return result.message;
					}
				});
			}).catch(err => [err.message || err || 'Internal Error']);
			return ret;
		}, {});
		return Promise.props(validations).then(props => {
			let errors = _.pickBy(props, (arr) => _.compact(arr).length);
			if (_.keys(errors).length) {
				errors = _.mapValues(errors, err => _.compact(err));
				throw new ValidationError(errors, data, constraints);
			}
			return props;
		});
	})
};

mitra.addLang('en', require('./messages/en'));
mitra.addValidators(validatorsPath);
mitra.ValidationError = ValidationError;
module.exports = mitra;
