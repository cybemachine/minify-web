"use strict";
exports.__esModule = true;
exports.express = exports.http = void 0;
var mime_1 = require("mime");
var path_1 = require("path");
var fs_1 = require("fs");
var notfound = function () { return '<h1>404</h1>'; };
var dir = function () { return '<h1>isdir</h1>'; };
function http(url, mpath, res) {
    url = url.replace("/" + mpath, "/");
    var file = path_1.join(process.cwd(), mpath, url);
    if (!fs_1.existsSync(file))
        return res.end(notfound()), void 0;
    if (!fs_1.statSync(file).isFile())
        return res.end(dir()), void 0;
    fs_1.readFile(file, function (err, data) {
        if (err)
            return res.end(err), void 0;
        res.setHeader('Content-Type', mime_1.getType(file) || 'text/plain');
        res.end(data);
    });
}
exports.http = http;
function express(root) {
    root = path_1.resolve(process.cwd(), root);
    return function (req, res, next) {
        if (!next)
            next = res.end;
        var file = path_1.join(root, req.url);
        if (!fs_1.existsSync(file))
            return next(notfound());
        if (!fs_1.statSync(file).isFile())
            return next(dir());
        fs_1.readFile(file, function (err, data) {
            if (!next)
                next = res.end;
            if (err)
                return next(err);
            res.set('Content-Type', mime_1.getType(file) || 'text/plain');
            res.send(data);
        });
    };
}
exports.express = express;
//# sourceMappingURL=index.js.map