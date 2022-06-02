"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opt = require("../settings.json");
const uglify_js_1 = require("uglify-js");
const exportnow = {
    startswith: '/api',
    handler: (req, res) => {
        const param = new URL(req.url, `http://localhost:8080`).searchParams;
        if (req.method == "GET") {
            const code = param.get("code") || param.get("input");
            if (!code)
                return res.end("no input/code detected");
            return res.end(uglify_js_1.minify(code, Object.assign(param.get("opt"), opt)));
        }
        ;
        if (req.method == "POST") {
            let b = "";
            req.on("data", c => b += c);
            return req.on("end", () => res.end(uglify_js_1.minify(b, Object.assign(param.get("opt"), opt))));
        }
        ;
    }
};
exports.default = exportnow;
