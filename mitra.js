const fs = require('fs');
const { join } = require('path');
const get = require('lodash.get');
const ValidationError = require('./lib/ValidationError');
const validators_path = join(__dirname, './validators');

const mitra = {
    __validators: {},

    normalize_rule(rule) {
        return rule.split('|').map((item) => {
            let [rule, options] = item.split(':');
            return { rule, options: options || true };
        });
    },

    normalize_rules(rules) {
        let ret = {};
        for (let [key, __rules] of Object.entries(rules)) {
            if (typeof __rules === 'string') {
                ret[key] = __rules.split('|').map((item) => {
                    let [rule, options] = item.split(':');
                    return { rule, options: options || true };
                });
            } else if (mitra.is(__rules, 'type:object')) {
                ret[key] = [];
                for (let [rule, options] of Object.entries(__rules)) {
                    ret[key].push({ rule, options });
                }
            } else {
                throw new Error(
                    'Rules must be either string represention of rules or an object literal.'
                );
            }
        }
        return ret;
    },

    __extend_from_file(file) {
        if (typeof file.contents.handler !== 'function')
            throw `The validator must have a 'handler' function. Path: ${file.path}`;

        if (this.__validators[file.name])
            throw `Validator "${file.name}" already exists!. Path: ${file.path}`;

        this.__validators[file.name] = file.contents;
    },

    __load_dir_files(dir) {
        return fs.readdirSync(dir).map((name) => {
            let filePath = join(dir, name);
            let fileName = name.split('.').slice(0, -1).join('.');
            return {
                name: fileName,
                path: filePath,
                contents: require(filePath),
            };
        });
    },
    /**
     * Load validation rules from a directory
     * @param  {string|array} path - absolute path(s) of directories
     * @return {[type]}      [description]
     */
    add_validators(path) {
        mitra.__load_dir_files(path).forEach((file) => {
            mitra.__extend_from_file(file);
        });
    },

    is(value, rules) {
        rules = mitra.normalize_rule(rules);
        for (let i = 0, l = rules.length; i < l; i++) {
            let { rule, options } = rules[i];
            if (mitra.validate(value, rule, options)) {
                return false;
            }
        }
        return true;
    },

    validate(value, rule, options, attr, data) {
        let validator = mitra.__validators[rule];
        if (!validator) throw new Error(`Unknown validator: ${rule}`);
        let ret = validator.handler(value, options, attr, data);
        return ret;
    },

    make_validator(rules) {
        rules = this.normalize_rules(rules);
        let rule_props = Object.keys(rules);
        return (data, should_throw = true) => {
            let errors = [];
            let invalids = [];
            let valids = [];
            for (let i = 0, l = rule_props.length; i < l; i++) {
                let prop = rule_props[i];
                let value = get(data, prop);
                let validators = rules[prop];
                for (let j = 0, cl = validators.length; j < cl; j++) {
                    let { rule, options } = validators[j];
                    let error = this.validate(value, rule, options, prop, data);
                    if (error) {
                        invalids.push(prop);
                        errors.push({
                            prop,
                            rule,
                            options,
                            message: error,
                        });
                    } else {
                        valids.push(prop);
                    }
                }
            }
            if (should_throw && errors.length) {
                throw new ValidationError(errors, data, rules);
            } else {
                return { valid: errors.length === 0, errors, invalids, valids };
            }
        };
    },
};

mitra.add_validators(validators_path);

mitra.ValidationError = ValidationError;

module.exports = mitra;
