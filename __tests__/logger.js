const Logger = require("../dist/logger");

const log = new Logger.default('./');

log.set('hi');
console.log(log.get())