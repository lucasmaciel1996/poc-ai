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
    "macielSTIO": {
      "command": "node",
      "args": [
        "PATH/poc-ia/mcp-server/build/server-stio.js"
      ],
      "env": {
        "INVOICE_API_URL":"http://localhost:3000"
      }
    },
    "macielLocalHTTP": {
      "url":"http://localhost:3001/mcp",
      "headers": {
        "APP_VERSION":"0.0.1"
      }
    }
  }
}

```