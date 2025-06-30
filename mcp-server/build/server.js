"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mc_server_1 = require("./mc-server");
const server = new mc_server_1.MCPServer();
server.start().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
