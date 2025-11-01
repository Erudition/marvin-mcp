import express from 'express';
import cors from 'cors';
import { createServer } from './tools.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-token', 'x-full-access-token'],
}));

app.options('/mcp', (req, res) => {
  res.sendStatus(204);
});
const port = 3000;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Received ${req.method} request for ${req.url}`);
  console.log('Request Headers:', req.headers);
  next();
});

app.post('/mcp', async (req, res) => {
  const apiToken = req.headers['x-api-token'] as string;
  const fullAccessToken = req.headers['x-full-access-token'] as string;
  if (!apiToken || !fullAccessToken) {
    console.error('Authorization failed: Missing x-api-token or x-full-access-token header');
    res.status(401).send('Unauthorized');
    return;
  }
  console.log('Authentication successful.');

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

app.get('*', (req, res) => {
  res.send(`
    <h1>MCP Server is running</h1>
    <p>This server provides an interface to the Amazing Marvin API via the Model Context Protocol.</p>
    <h2>Available Endpoints:</h2>
    <ul>
      <li><strong>POST /mcp</strong>: The main endpoint for MCP requests.</li>
    </ul>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});


