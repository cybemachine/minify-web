const opt = require("../settings.json");
import { REQ, RES } from "../lib/handler";
import { minify as min } from "uglify-js";

const exportnow = {
  startswith: "/api",
  handler: (req: REQ, res: RES) => {
    const param = new URL(String(req.url), `http://localhost:8080`)
      .searchParams;
    const options = Object.assign(param.get("opt") || {}, opt);

    if (req.method == "GET") {
      const code = param.get("code") || param.get("input");

      if (!code) return res.end("no input/code detected");
      return res.end(min(code, options));
    }

    if (req.method == "POST") {
      let b = "";

      req.on("data", (c) => (b += c));
      return req.on("end", () => res.end(min(b, options)));
    }
  },
};

export default exportnow;
