
import dotEnv from 'dotenv'
dotEnv.config()

import { MCPServer } from "./mc-server";

const server = new MCPServer()

server.start().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
}); 