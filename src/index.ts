import express from 'express';
import { createServer } from './tools.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

const app = express();
const port = 3000;

app.post('/mcp', async (req, res) => {
  const apiToken = req.headers['x-api-token'] as string;
  const fullAccessToken = req.headers['x-full-access-token'] as string;
  if (!apiToken || !fullAccessToken) {
    res.status(401).send('Unauthorized');
    return;
  }

  const server = createServer(apiToken, fullAccessToken);

  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  res.on('close', () => {
    transport.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});
