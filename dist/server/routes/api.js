"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opt = require("../settings.json");
const uglify_js_1 = require("uglify-js");
const exportnow = {
    startswith: "/api",
    handler: (req, res) => {
        const param = new URL(String(req.url), `http://localhost:8080`)
            .searchParams;
        const options = Object.assign(param.get("opt") || {}, opt);
        if (req.method == "GET") {
            const code = param.get("code") || param.get("input");
            if (!code)
                return res.end("no input/code detected");
            return res.end(uglify_js_1.minify(code, options));
        }
        if (req.method == "POST") {
            let b = "";
            req.on("data", (c) => (b += c));
            return req.on("end", () => res.end(uglify_js_1.minify(b, options)));
        }
    },
};
exports.default = exportnow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcGFja2FnZXMvc2VydmVyL3JvdXRlcy9hcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUV4Qyx5Q0FBMEM7QUFFMUMsTUFBTSxTQUFTLEdBQUc7SUFDaEIsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxFQUFFO1FBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsdUJBQXVCLENBQUM7YUFDNUQsWUFBWSxDQUFDO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFM0QsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBRTtZQUN2QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDcEQsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVYLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQztBQUVGLGtCQUFlLFNBQVMsQ0FBQyJ9