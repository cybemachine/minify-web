import {
    getType
} from "mime";
import {
    resolve,
    join
} from "path";
import {
    ServerResponse
} from 'http';
import {
    existsSync,
    statSync,
    readFile
} from "fs";
import {
    Request,
    Response,
    NextFunction
} from 'express-serve-static-core';

const notfound = () => '<h1>404</h1>';
const dir = () => '<h1>isdir</h1>';

export function http(url: string, mpath: string, res: ServerResponse) {
    url = url.replace(`/${mpath}`, "/");

    const file = join(process.cwd(), mpath, url);

    if (!existsSync(file)) return res.end(notfound()), void 0;
    if (!statSync(file).isFile()) return res.end(dir()), void 0;

    readFile(file, (err, data) => {
        if (err) return res.end(err), void 0;

        res.setHeader('Content-Type', getType(file) || 'text/plain');
        res.end(data);
    });
};

export function express(root: string) {
    root = resolve(process.cwd(), root);

    return (req: Request, res: Response, next: NextFunction) => {
        if (!next) next = res.end;
        const file = join(root, req.url);

        if (!existsSync(file)) return next(notfound());
        if (!statSync(file).isFile()) return next(dir());

        readFile(file, (err, data) => {
            if (!next) next = res.end;
            if (err) return next(err);

            res.set('Content-Type', getType(file) || 'text/plain');
            res.send(data);
        });
    };
};