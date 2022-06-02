export interface routesfile {
    path?: string;
    endswith?: string;
    startswith?: string;
    handler?: (req: any, res: any) => void;
    handlerAsync?: (req: any, res: any) => Promise<void>;
}
export interface routesfileexport {
    __esModule: boolean;
    default: routesfile;
}
export declare type routesarr = routesfile[];
