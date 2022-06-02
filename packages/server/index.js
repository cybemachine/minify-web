"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const logger_1 = __importDefault(require("../logger"));
const handler_1 = __importDefault(require("./handler"));
const fs_1 = require("fs");
const timers_1 = require("timers");
const routes = [];
findroutes();
const server = new http_1.Server();
const logger = new logger_1.default();
server.on("request", (requ, resu) => {
    const { req, res } = handler_1.default(requ, resu);
    router(req, res);
});
timers_1.setInterval(findroutes, 10 * 1000);
function findroutes() {
    fs_1.readdirSync(`${__dirname}/routes`)
        .filter(e => e.endsWith('.js'))
        .forEach(f => {
        const mod = require(`./routes/${f}`);
        routes.push(mod.__esModule ? mod.default : mod);
    });
}
function router(req, res, i = 0) {
    let mod = routes[i];
    if (!mod) {
        res.statusCode = 404;
        res.statusMessage = 'Not Found';
        console.log(`${req.method} ${req.url}`, mod);
        return res.end('404');
    }
    const runmod = () => {
        console.log(`${req.method} ${req.url}`, mod);
        if (mod.handler)
            return mod.handler(req, res);
        if (mod.handlerAsync)
            return mod.handlerAsync(req, res);
        throw new TypeError(`${mod.startswith} has no handler`);
    };
    if (mod.path && req.url == mod.path)
        return runmod();
    if (mod.endswith && req.url.endsWith(mod.endswith))
        return runmod();
    if (mod.startswith && req.url.startsWith(mod.startswith))
        return runmod();
    router(req, res, i + 1);
}
exports.default = server;
