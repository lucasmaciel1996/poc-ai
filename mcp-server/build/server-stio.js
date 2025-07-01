"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mc_server_1 = require("./mc-server");
async function startStIO() {
    return await new mc_server_1.MCPServer().startStioTransport();
}
async function main() {
    startStIO().catch(err => console.error(err));
}
main();
