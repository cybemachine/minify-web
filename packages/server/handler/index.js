"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const req_1 = __importDefault(require("./req"));
const res_1 = __importDefault(require("./res"));
exports.default = (requ, resu) => ({ req: req_1.default(requ), res: res_1.default(resu) });
