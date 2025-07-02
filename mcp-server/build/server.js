"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mc_server_1 = require("./mc-server");
const express_1 = __importDefault(require("express"));
const streamableHttp_1 = require("@modelcontextprotocol/sdk/server/streamableHttp");
async function startHttp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // SSE notifications not supported in stateless mode
    app.get('/mcp', async (req, res) => {
        console.log('Received GET MCP request');
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: "2.0",
            error: {
                code: -32000,
                message: "Method not allowed."
            },
            id: null
        }));
    });
    // Session termination not needed in stateless mode
    app.delete('/mcp', async (req, res) => {
        console.log('Received DELETE MCP request');
        res.writeHead(405).end(JSON.stringify({
            jsonrpc: "2.0",
            error: {
                code: -32000,
                message: "Method not allowed."
            },
            id: null
        }));
    });
    app.post('/mcp', async (req, res) => {
        // In stateless mode, create a new instance of transport and server for each request
        // to ensure complete isolation. A single instance would cause request ID collisions
        // when multiple clients connect concurrently.
        try {
            const server = await new mc_server_1.MCPServer().getServerInstance();
            const transport = new streamableHttp_1.StreamableHTTPServerTransport({
                sessionIdGenerator: undefined,
            });
            res.on('close', () => {
                console.log('Request closed');
                transport.close();
                server.close();
            });
            await server.connect(transport);
            console.log('BODY-REQUEST', req.body);
            await transport.handleRequest(req, res, req.body);
        }
        catch (error) {
            console.error('Error handling MCP request:', error);
            if (!res.headersSent) {
                res.status(500).json({
                    jsonrpc: '2.0',
                    error: {
                        code: -32603,
                        message: 'Internal server error',
                    },
                    id: null,
                });
            }
        }
    });
    return await app.listen(3001, () => console.log('Start HTTP'));
}
async function main() {
    startHttp().catch(err => console.error(err));
}
main();
