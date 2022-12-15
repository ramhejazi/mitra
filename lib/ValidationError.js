'use strict';

function ValidationError(errors, data, rules) {
    this.message = 'Validation Error';
    this.errors = errors;
    this.data = data;
    this.rules = rules;
    this.stack = new Error().stack;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

module.exports = ValidationError;
