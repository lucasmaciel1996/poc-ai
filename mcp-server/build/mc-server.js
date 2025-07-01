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
                customerId: zod_1.z.number(),
            }
        }, async ({ customerId }) => {
            const res = await fetch(`${process.env.INVOICE_API_URL}/invoices/customers/${customerId}`, {
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
        this.server.registerTool('refund_invoice', {
            title: 'Refund one invoice',
            description: 'Give a invoiceId when a status is paid refund the invocie',
            inputSchema: {
                invoiceId: zod_1.z.number(),
            }
        }, async ({ invoiceId }) => {
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/invoices/${invoiceId}/refund`, 'POST');
            return {
                content: [{ type: 'text', text: JSON.stringify(res.data) }]
            };
        });
        this.server.registerTool('pay_invoice', {
            title: 'Pay one invoice',
            description: 'Give a invoiceId pay one invocie',
            inputSchema: {
                invoiceId: zod_1.z.number(),
            }
        }, async ({ invoiceId }) => {
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/invoices/${invoiceId}/refund`, 'POST');
            return {
                content: [{ type: 'text', text: JSON.stringify(res.data) }]
            };
        });
        this.server.registerTool('list_customers', {
            title: 'List all customers',
            description: 'Return all customers created',
        }, async () => {
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/customers`, 'GET');
            return {
                content: [{ type: 'text', text: JSON.stringify(res.data) }]
            };
        });
    }
    async makeRequestAPi(url, method) {
        const res = await fetch(url, {
            method,
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    }
    async start() {
        const transport = new stdio_js_1.StdioServerTransport();
        await this.server.connect(transport);
        console.error('MCP server runing os stdio');
    }
}
exports.MCPServer = MCPServer;
