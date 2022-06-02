import { REQ } from "../lib/handler";
import { IncomingMessage as IM } from "http";

function ip(t: REQ) {
    const e = t.headers["x-forwarded-for"] || "", r = [];
    let n = e.length, o = e.length;
    for (let s, c = e.length - 1; 0 <= c; c--) 32 === (s = e.toString().charCodeAt(c)) ? o === n && (o = n = c) : o = 44 === s ? (o != n && r.push(e.toString().substring(o, n)), n = c) : c; 
    o != n && r.push(e.toString().substring(o, n))
    return [(Reflect.has(t, "socket") ? t.socket : t.connection).remoteAddress, ...r].pop()
}

export default function req(requ: IM) {
    //@ts-ignore
    const req: REQ = requ;

    req.URL = new URL(req.url || '/', "http://localhost");
    req.get = req.header = (key) => String(req.headers[key.toLowerCase()]);

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