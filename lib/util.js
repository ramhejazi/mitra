const path = require('path');
const fs = require('fs');

module.exports = {
    /**
     * Converts constrains specified as a string into objects
     * @param {object|string} rules - validation constaints
     * @return {object} normalized constaints
     */
    normalize_rules(rules) {
        let ret = {};
        for (let [key, __rules] of Object.entries(rules)) {
            if (typeof __rules === 'string') {
                ret[key] = __rules.split('|').map(item => {
                    let [rule, options] = item.split(':');
                    return { rule, options: options || true };
                });
            } else {
                ret[key] = __rules;
            }
        }
        return ret;
    },

    loadDirFiles(dir) {
        return fs.readdirSync(dir).map((name) => {
            let filePath = path.join(dir, name);
            let fileName = name.split('.').slice(0, -1).join('.');
            return {
                name: fileName,
                path: filePath,
                contents: require(filePath),
            };
        });
    },

    getType(value) {
        return Object.prototype.toString
            .apply(value)
            .match(/\[object (\w+)\]/)[1]
            .toLowerCase();
    },
};
