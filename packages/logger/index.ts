import * as fs from "fs";
import fse from 'fs-extra';
import { levels, msg } from "./lib";
import { resolve, extname } from "path";
import { encode, decode } from "punycode";

const time = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}.${date.getMilliseconds()}`;
}

export class Logger {
    fname: string;
    data: {
        obj: {
            [x: string]: any
        }, meta: {
            level: levels,
            timestamp: string
        }
    }[];
    backupdir: string;
    constructor(fname = `${process.cwd()}/log/index.log`) {
        const self: Logger = this;

        if (extname(fname) == '') fname += '.log';

        this.data = [
            {
                obj: {
                    msg: 'Logger init'
                },
                meta: {
                    level: 'default',
                    timestamp: time()
                }
            }
        ];
        this.fname = resolve(process.cwd(), fname);
        this.backupdir = resolve(this.fname, '../backup');
    }

    save() {
        const self: Logger = this;
        const backupfile = resolve(this.backupdir, time() + '.log')
        const data = this.data.map(e => `${e.meta.timestamp} ${e.meta.level.toUpperCase()} ${encode(JSON.stringify(e.obj))}`).join('\n');

        fse.ensureFileSync(backupfile);
        fse.writeFileSync(self.fname, data);
    }

    set(msg: msg, level: levels = 'default') {
        let obj;

        switch (typeof msg) {
            case 'number':
            case 'string':
                obj = { msg: msg.toString() }
                break;
            case 'object':
                obj = { ...msg }
                break;
            default:
                throw new TypeError(`${msg} is not a valid type`);
        }

        this.data.push({ obj, meta: { level, timestamp: time() } });
        this.save();
    }

    get() {
        const read = fs.readFileSync(this.fname, 'utf8');
        return read.split('\n').map(e => {
            const [timestamp, level, obj] = e.split(' ');
            return { timestamp, level, obj: JSON.parse(decode(obj)) }
        })
    }
};

export default Logger;