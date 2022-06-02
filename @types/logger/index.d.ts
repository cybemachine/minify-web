import { levels, msg } from "./lib";
export declare class Logger {
    fname: string;
    data: {
        obj: {
            [x: string]: any;
        };
        meta: {
            level: levels;
            timestamp: string;
        };
    }[];
    backupdir: string;
    constructor(fname?: string);
    save(): void;
    set(msg: msg, level?: levels): void;
    get(): {
        timestamp: string;
        level: string;
        obj: any;
    }[];
}
export default Logger;
