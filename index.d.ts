/// <reference types="node" />
import { ServerResponse } from 'http';
import { Request, Response, NextFunction } from 'express-serve-static-core';
export declare function http(url: string, mpath: string, res: ServerResponse): any;
export declare function express(root: string): (req: Request, res: Response, next: NextFunction) => void;
