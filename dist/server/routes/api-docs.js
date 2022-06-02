"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exportnow = {
    path: '/api-docs',
    handler: (req, res) => {
        res.set('Content-Type', 'text/html');
        res.end(`<title>Redoc</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700|Roboto:300,400,700" rel="stylesheet">
        <style> body { margin: 0; padding: 0; } </style><redoc spec-url='/json-api'></redoc>
        <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"> </script>`);
    }
};
exports.default = exportnow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWRvY3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wYWNrYWdlcy9zZXJ2ZXIvcm91dGVzL2FwaS1kb2NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxTQUFTLEdBQUc7SUFDZCxJQUFJLEVBQUUsV0FBVztJQUNqQixPQUFPLEVBQUUsQ0FBQyxHQUFRLEVBQUUsR0FBUSxFQUFFLEVBQUU7UUFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7O3VHQUd1RixDQUFDLENBQUM7SUFDckcsQ0FBQztDQUNKLENBQUE7QUFFRCxrQkFBZSxTQUFTLENBQUMifQ==