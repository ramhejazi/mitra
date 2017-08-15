![mitra - JavaScript (node.js) validation library](https://github.com/ramhejazi/mitra/blob/master/mitra_logo.png)

[![npm version](https://badge.fury.io/js/mitra.svg)](https://badge.fury.io/js/mitra) [![npm](https://img.shields.io/npm/dt/mitra.svg)](https://www.npmjs.com/package/mitra)

_mitra_ is a simple library for validating data/schemata. It's promise-based and extendable.

[Installation](#installation) | [Example](#example) | [Validators](#validators)


## Installation
```
$ npm i mitra
```

## Example:

```javascript
const mitra = require('mitra')

mitra.validate({
  user_name: 'paranoid32',
  email: 'philonoid@hell.com',
  password: 's3cr3t',
  password_confirmation: 's3cr3t',
  job: 'In-House Philosopher',
  age: 10
}, {
  user_name: 'required|string|min_length:4|max_length:30',
  email: 'required|email',
  password: 'required|string|min_length:8|confirmed',
  age: 'integer|min:12|max:100',
  job: {
	  required: true,
	  string: true,
	  in: ['Professional Snuggler', 'Bride Kidnapping Expert', 'Chief Trouble Maker', 'Ex-monshiner']
  }
}).then(() => {
  // passes
}).catch(err => {
  // fails
})
```

## Validators
#### [array](https://github.com/ramhejazi/mitra/blob/master/validators/array.js)
checks: (`any`)  
Value must be an `array`.

#### [boolean](https://github.com/ramhejazi/mitra/blob/master/validators/boolean.js)
checks: (`any`)  
Value must be a `boolean` value, i.e. `true` or `false`.

#### [confirmed](https://github.com/ramhejazi/mitra/blob/master/validators/confirmed.js)
checks: (`any`)  
Checks equality between 2 attributes' value, i.e. useful for checking password confirmation fields.

#### [email](https://github.com/ramhejazi/mitra/blob/master/validators/email.js)
checks: (`string`)  
Value should be a valid email address.

#### [in](https://github.com/ramhejazi/mitra/blob/master/validators/in.js)
checks: (`any`)  
Value must one of the allowed options.

#### [integer](https://github.com/ramhejazi/mitra/blob/master/validators/integer.js)
checks: (`number`)  
Value (number) must be an integer.

#### [max](https://github.com/ramhejazi/mitra/blob/master/validators/max.js)
checks: (`number`)  
Value (number) should be equal or less than specified max value.

#### [max_length](https://github.com/ramhejazi/mitra/blob/master/validators/max_length.js)
checks: (`string, array`)  
Length of the value should be equal or less than specified maximum length.

#### [min](https://github.com/ramhejazi/mitra/blob/master/validators/min.js)
checks: (`undefined`)  
Value (number) should be equal or more than specified minimum value.

#### [min_length](https://github.com/ramhejazi/mitra/blob/master/validators/min_length.js)
checks: (`string, array`)  
Length of the value should be equal or more than specified minimum length.

#### [null](https://github.com/ramhejazi/mitra/blob/master/validators/null.js)
checks: (`any`)  
Value must be `null`.

#### [number](https://github.com/ramhejazi/mitra/blob/master/validators/number.js)
checks: (`any`)  
Value must be a `number`.

#### [object](https://github.com/ramhejazi/mitra/blob/master/validators/object.js)
checks: (`any`)  
Value must be a plain `object`.

#### [range](https://github.com/ramhejazi/mitra/blob/master/validators/range.js)
checks: (`number`)  
Value (number) must be in range, inclusive.

#### [required](https://github.com/ramhejazi/mitra/blob/master/validators/required.js)
checks: (`any`)  
Value must not be `undefined`, `null`, or an empty string!

#### [required_if](https://github.com/ramhejazi/mitra/blob/master/validators/required_if.js)
checks: (`any`)  
Element is required when another attribute is equal to the specified value.

#### [string](https://github.com/ramhejazi/mitra/blob/master/validators/string.js)
checks: (`any`)  
Value must be a `string`.

#### [type](https://github.com/ramhejazi/mitra/blob/master/validators/type.js)
checks: (`any`)  
Value must have one of the specified JavaScript types.

#### [undefined](https://github.com/ramhejazi/mitra/blob/master/validators/undefined.js)
checks: (`any`)  
Value must be `undefined`.

#### [url](https://github.com/ramhejazi/mitra/blob/master/validators/url.js)
checks: (`string`)  
Value must be a valid url.



## License
MIT © Ram Hejazi
