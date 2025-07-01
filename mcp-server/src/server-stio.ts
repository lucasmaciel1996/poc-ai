
import dotEnv from 'dotenv'
dotEnv.config()

import { MCPServer } from "./mc-server";

async function startStIO() {
    return await new MCPServer().startStioTransport();
}

async function main() {
    startStIO().catch(err => console.error(err))

}

main()