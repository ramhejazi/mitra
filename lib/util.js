const path = require('path');
const fs = require('fs');

module.exports = {
  _normalizeConstraint(param, aliases) {
    if (typeof param === 'object') return param;
    return param.split('|').reduce((ret, item) => {
        let [rule, options] = item.split(':');
        if ( aliases.hasOwnProperty(rule) ) {
          Object.assign(ret, aliases[rule]);
          return ret;
        }
        ret[rule] = options || true;
        return ret;
    }, {});
  },
  /**
   * Converts constrains specified as a string into objects
   * @param {object|string} constrains - validation constaints
   * @return {object} normalized constaints
   */
  normalizeConstraints(constraints, aliases = {}) {
    if ( typeof constraints === 'string' ) {
      return this._normalizeConstraint(constraints, aliases);
    }
    return Object.keys(constraints).reduce((ret, key) => {
        let attrConstraint = this._normalizeConstraint(constraints[key], aliases);
        ret[key] = attrConstraint;
        return ret;
    }, {});
  },

  loadDirFiles(dir) {
    return fs.readdirSync(dir).map(name => {
        let filePath = path.join(dir, name);
        let fileName = name.split('.').slice(0, -1).join('.');
        return {
          name: fileName,
          path: filePath,
          contents: require(filePath)
        };
    });
  },

}
