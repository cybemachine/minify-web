import { Server } from "http";
import Logger from '../logger';
import handler from "./handler";
import { readdirSync } from 'fs';
import { routesfile, routesarr } from './lib';
import { setInterval } from 'timers';
import { REQ, RES } from "./lib/handler";

findroutes();
const server = new Server();
const logger = new Logger();
const routes: routesarr = [];

server.on("request", (requ, resu) => {
    const { req, res } = handler(requ, resu)
    router(req, res);
});

setInterval(findroutes, 10 * 1000)

function findroutes() {
    readdirSync(`${__dirname}/routes`)
        .filter(e => e.endsWith('.js'))
        .forEach(f => {
            const mod = require(`./routes/${f}`)
            routes.push(mod.__esModule ? mod.default : mod);
        })
}

function router(req: REQ, res: RES, i = 0) {
    let mod: routesfile = routes[i];
    const url = new URL(String(req.url), 'http://localhost').pathname;

    if (!mod) {
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        console.log(`${req.method} ${req.url}`, mod);
        return res.end('404');
    }

    const runmod = () => {
        console.log(`${req.method} ${req.url}`, mod);
        if (mod.handler) return mod.handler(req, res);
        if (mod.handlerAsync) return mod.handlerAsync(req, res);
        throw new TypeError(`${mod.startswith} has no handler`);
    }

    if (mod.path && url == mod.path) return runmod()
    if (mod.endswith && url.endsWith(mod.endswith)) return runmod()
    if (mod.startswith && url.startsWith(mod.startswith)) return runmod()

    router(req, res, i + 1);
}

export default server;