# mitra
> JavaScript Validator

mitra is a simple library for validating data. It's promise-based and extendable.

## Table of Contents:
- [Installation](#installation)
- [Example](#example)

## Installation
```
$ npm install mitra --save
```

## Example:

```javascript
const mitra = require('mitra')

mitra.validate({
  user_name: 'zoro32',
  email: 'foo@bar.com',
  age: 40
}, {
  user_name: 'required|string|min_length:4|max_length:30',
  email: 'required|email',
  age: 'integer|min:12|max:100'
}).then(() => {
  // passes
}).catch(errors => {
  // fails
})
```

## License
MIT © Ram Hejazi
