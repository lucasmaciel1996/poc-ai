# poc-ai


## Setup
1 - Build MCP-server
```bash 
   cd mcp-server && npm run build
  
```
2 - get path 
```bash 
  pwd 
  
```
3 - Cursor Settings

```json
{
  "mcpServers": {
    "macielLocal": {
      "command": "node",
      "args": [
        "PATH/poc-ia/mcp-server/build/server.js"
      ],
      "env": {
        "INVOICE_API_URL":"http://localhost:3000"
      }
    }
  }
}

```