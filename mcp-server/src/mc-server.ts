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
        },{
            capabilities:{
                resources:{},
                tools:{}
            }
        })

        this.setupToolHandlers()
    }

    private setupToolHandlers() {
        this.server.registerTool('list_invoices', {
            title: 'List all invoice',
            description: 'Give a customerId return all list of invoices',
            inputSchema: {
                customerId: z.string(),
            }
        }, async ({ customerId }) => {
            const res = await fetch(`http://localhost:3000/invoices/customers/${customerId}`,{
                method:'GET',
                headers:{
                  'Accept':'application/json'  
                }
            })
            const data = await res.json()

            return {
                content: [{ type:'text',text: JSON.stringify(data.data)} ]
            }
        })
    }

    async start() {
        const transport = new StdioServerTransport()

        await this.server.connect(transport)
        console.error('MCP server runing os stdio')
    }
}