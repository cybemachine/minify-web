import { getType } from "mime";
import { RES } from "../lib/handler";
import { OutgoingHttpHeader, ServerResponse as SR } from "http";

function fastmap(callback: (key: string, val: OutgoingHttpHeader) => void) {
    //@ts-ignore
    let self = this;
    const obj = Object.keys(self);
    for (let i = 0; i < obj.length; i++) callback(obj[i], self[obj[i]]);
}

export default function res(resu: SR) {
    //@ts-ignore
    const res: RES = resu;

    res.status = (code: number) => {
        res.statusCode = code;
        return res;
    };

    res.set = res.header = (field: string | { [x: string]: number | string | string[] }, value) => {
        if (typeof field === 'object') {
            fastmap.bind(field);
            return fastmap((id, val) => res.set(id, val.toString())), res;
        }

        let val = Array.isArray(value) ? value.map(String) : String(value);

        if (field.toLowerCase() == 'c-type') {
            if (Array.isArray(val))
                throw new TypeError('Content-Type cannot be set to an Array');

            if (!/;\s*charset\s*=/.test(val)) {
                const charset = getType(val.split(';')[0]);
                charset && (val += `; charset=${charset.toLowerCase()}`);
            }
        }

        return res.setHeader(field, val), res;
    };

    return res;
}