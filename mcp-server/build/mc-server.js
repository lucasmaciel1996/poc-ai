"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCPServer = void 0;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
const zod_1 = require("zod");
class MCPServer {
    constructor() {
        console.log('[SETUP] Initializing MCPServer...');
        this.server = new mcp_js_1.McpServer({
            name: 'ai-mcp-server',
            version: '0.0.1',
        }, {
            capabilities: {
                resources: {},
                tools: {}
            }
        });
        this.setupToolHandlers();
    }
    setupToolHandlers() {
        this.server.registerTool('list_invoices', {
            title: 'List all invoice',
            description: 'Give a customerId return all list of invoices',
            inputSchema: {
                customerId: zod_1.z.string(),
            }
        }, async ({ customerId }) => {
            const res = await fetch(`http://localhost:3000/invoices/customers/${customerId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await res.json();
            return {
                content: [{ type: 'text', text: JSON.stringify(data.data) }]
            };
        });
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error('MCP server runing os stdio');
    }
}
exports.MCPServer = MCPServer;
