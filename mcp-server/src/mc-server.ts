import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod'

export class MCPServer {
    private server: McpServer

    constructor() {
        console.log('[SETUP] Initializing MCPServer...')
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
            const body = JSON.stringify({
                amount,
                customerId,
                dueDate
            })
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/invoices`, 'POST', body)

            return {
                content: [{ type: 'text', text: JSON.stringify(res) }]
            }
        })
        this.server.registerTool('list_invoices', {
            title: 'List all invoice',
            description: 'List all list of invoices with customer',
        }, async () => {
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/invoices`, 'GET')

            return {
                content: [{ type: 'text', text: JSON.stringify(res) }]
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
                content: [{ type: 'text', text: JSON.stringify(res) }]
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
                content: [{ type: 'text', text:JSON.stringify(res) }]
            }
        })

        this.server.registerTool('list_customers', {
            title: 'List all customers',
            description: 'Return all customers created',
        }, async () => {
            const res = await this.makeRequestAPi(`${process.env.INVOICE_API_URL}/customers`, 'GET')

            return {
                content: [{ type: 'text', text: JSON.stringify(res) }]
            }
        })
    }

    private async makeRequestAPi(url: string, method: 'GET' | 'POST', bodyPayload?: string) {
        console.log(`Request: [${method}]${url} body ${bodyPayload}`)
        const res = await fetch(url, {
            method,
            headers: {
                'Accept': 'application/json'
            },
            body: bodyPayload ? bodyPayload :undefined
        })
        const data = await res.json()
        console.log({'res':data})

        return data
    }

    async startStioTransport() {
        const stdioTransport = new StdioServerTransport()
        await this.server.connect(stdioTransport)
        console.error('MCP server runing stio')
    }

    async getServerInstance() {
        console.error('MCP server runing HTTP/SSE')
        return this.server
    }
}