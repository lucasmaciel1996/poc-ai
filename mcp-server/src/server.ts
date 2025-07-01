
import dotEnv from 'dotenv'
dotEnv.config()

import { MCPServer } from "./mc-server";
import express, { Request, Response } from 'express'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp';


async function startHttp() {
    const app = express();
    app.use(express.json());

    // SSE notifications not supported in stateless mode
    app.get('/mcp', async (req: Request, res: Response) => {
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
    app.delete('/mcp', async (req: Request, res: Response) => {
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


    app.post('/mcp', async (req: Request, res: Response) => {
        // In stateless mode, create a new instance of transport and server for each request
        // to ensure complete isolation. A single instance would cause request ID collisions
        // when multiple clients connect concurrently.

        try {
            const server = await new MCPServer().getServerInstance();
            const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
                sessionIdGenerator: undefined,
            });

            res.on('close', () => {
                console.log('Request closed');
                transport.close();
                server.close();
            });

            await server.connect(transport);
            console.log('BODY-REQUEST', req.body)

            await transport.handleRequest(req, res, req.body);

        } catch (error) {
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

    return await app.listen(3001, () => console.log('Start HTTP'))
}

async function main() {
    startHttp().catch(err=> console.error(err))

}

main()