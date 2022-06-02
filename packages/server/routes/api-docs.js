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
