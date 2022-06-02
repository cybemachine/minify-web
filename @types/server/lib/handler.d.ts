/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
interface Req {
    URL: URL;
    ip: string;
    xhr: boolean;
    secure: boolean;
    protocol: 'https' | 'http';
    get(id: string): string | string[];
    header(id: string): string | string[];
}
interface Res {
    status(code: number): RES;
    set(id: object | string, val: string[] | string): RES;
    header(id: object | string, val: string[] | string): RES;
}
export declare type RES = Res & ServerResponse;
export declare type REQ = Req & IncomingMessage;
export {};
