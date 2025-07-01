import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod'

export class MCPServer {
    private server: McpServer

    constructor() {
        console.log('[SETUP] Initializing MCPServer...')

        console.log('ENV', process.env.INVOICE_API_URL)

        this.server = new McpServer({
            name: 'ai-mcp-server',
            version: '0.0.1',
        }, {
            capabilities: {
                resources: {},
                tools: {}
            }
        })

        this.setupToolHandlers()
    }

    private setupToolHandlers() {

        this.server.registerTool('create_invoice', {
            title: 'Create a new invoice',
            description: 'Create a new invoice for customer',
            inputSchema: {
                amount: z.number(),
                customerId: z.number(),
                dueDate: z.date(),
            }
        }, async ({
            amount,
            customerId,
            dueDate
        }) => {
            const res = await fetch(`${process.env.INVOICE_API_URL}/invoices`, {
                method: 'POST',
                body: JSON.stringify({
                    amount,
                    customerId,
                    dueDate
                }),
                headers: {
                    'Accept': 'application/json'
                }
            })
            const data = await res.json()

            return {
                content: [{ type: 'text', text: JSON.stringify(data.data) }]
            }
        })
        this.server.registerTool('list_invoices', {
            title: 'List all invoice',
            description: 'List all list of invoices with customer',
        }, async () => {
            const res = await fetch(`${process.env.INVOICE_API_URL}/invoices`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            })
            const data = await res.json()

            return {
                content: [{ type: 'text', text: JSON.stringify(data.data) }]
            }
        })
        this.server.registerTool('refund_invoice', {
            title: 'Refund one invoice',
            description: 'Give a invoiceId when a status is paid refund the invocie',
            inputSchema: {
                invoiceId: z.number(),
            }
        }, async ({ invoiceId }) => {
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/invoices/${invoiceId}/refund`, 'POST')

            return {
                content: [{ type: 'text', text: JSON.stringify(res.data) }]
            }
        })

        this.server.registerTool('pay_invoice', {
            title: 'Pay one invoice',
            description: 'Give a invoiceId pay one invocie',
            inputSchema: {
                invoiceId: z.number(),
            }
        }, async ({ invoiceId }) => {
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/invoices/${invoiceId}/pay`, 'POST')

            return {
                content: [{ type: 'text', text: JSON.stringify(res.data) }]
            }
        })

        this.server.registerTool('list_customers', {
            title: 'List all customers',
            description: 'Return all customers created',
        }, async () => {
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/customers`, 'GET')

            return {
                content: [{ type: 'text', text: JSON.stringify(res.data) }]
            }
        })
    }


    private async makeRequestAPi(url: string, method: 'GET' | 'POST') {
        const res = await fetch(url, {
            method,
            headers: {
                'Accept': 'application/json'
            }
        })
        const data = await res.json()

        return data
    }
    async start() {
        const transport = new StdioServerTransport()

        await this.server.connect(transport)
        console.error('MCP server runing os stdio')
    }
}