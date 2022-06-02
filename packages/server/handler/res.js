"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mime_1 = require("mime");
function fastmap(object, callback) {
    const obj = Object.keys(object);
    for (let i = 0; i < obj.length; i++) {
        const element = object[obj[i]];
        callback(obj[i], element);
    }
}
function res(resu) {
    //@ts-ignore
    const res = resu;
    res.set = res.header = (field, value) => {
        if (typeof field === 'object')
            return fastmap(field, (id, val) => res.set(id, val))[0];
        let val = Array.isArray(value) ? value.map(String) : String(value);
        if (field.toLowerCase() == 'c-type') {
            if (Array.isArray(val))
                throw new TypeError('Content-Type cannot be set to an Array');
            if (!/;\s*charset\s*=/.test(val)) {
                const charset = mime_1.getType(val.split(';')[0]);
                charset && (val += `; charset=${charset.toLowerCase()}`);
            }
        }
        return res.setHeader(field, val), res;
    };
    return res;
}
exports.default = res;
