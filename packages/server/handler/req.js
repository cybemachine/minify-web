"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ip(t) {
    const e = t.headers["x-forwarded-for"] || "", r = [];
    let n = e.length, o = e.length;
    for (let s, c = e.length - 1; 0 <= c; c--)
        32 === (s = e.toString().charCodeAt(c)) ? o === n && (o = n = c) : o = 44 === s ? (o != n && r.push(e.toString().substring(o, n)), n = c) : c;
    o != n && r.push(e.toString().substring(o, n));
    return [(Reflect.has(t, "socket") ? t.socket : t.connection).remoteAddress, ...r].pop();
}
function req(requ) {
    //@ts-ignore
    const req = requ;
    req.get = req.header = (key) => req.headers[key.toLowerCase()];
    Object.defineProperties(req, {
        protocol: {
            get: () => String(req.get("X-Forwarded-Proto") || `http${Reflect.has(req.socket, "encrypted") ? "s" : ""}`).toLowerCase()
        },
        secure: {
            get: () => req.protocol === 'https'
        },
        ip: {
            get: () => ip(req)
        },
        xhr: {
            get: () => String(req.get('X-Requested-With') || '').toLowerCase() === 'xmlhttprequest'
        }
    });
    return req;
}
exports.default = req;
