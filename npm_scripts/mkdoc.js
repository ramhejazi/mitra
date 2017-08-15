const mitra = require('../index');
const _ = require('lodash');

const toHTML = (el, name) => {
	return `
#### [${name}](https://github.com/ramhejazi/mitra/blob/master/validators/${name}.js)
checks: (\`${Array.isArray(el.checks) ? el.checks.join(', ') : el.checks}\`)  
${el.description}`;
};

let desc = _.map(mitra._validators, toHTML).join('\n');

console.log(desc);
