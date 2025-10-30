import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { RequestHandlerExtra } from '@modelcontextprotocol/sdk/shared/protocol.js';
import axios from 'axios';
import { z } from 'zod';

const MARVIN_API_URL = 'https://serv.amazingmarvin.com/api';

// Zod Schemas for Tool Inputs
const CreateTaskSchema = z.object({
  title: z.string().describe('The title of the task.'),
  day: z.string().optional().describe('The day the task is scheduled for (YYYY-MM-DD).'),
  parentId: z.string().optional().describe('The ID of the parent project or category.'),
  labelIds: z.array(z.string()).optional().describe('An array of label IDs.'),
  dueDate: z.string().optional().describe('The due date of the task (YYYY-MM-DD).'),
  timeEstimate: z.number().optional().describe('The estimated time in milliseconds.'),
  note: z.string().optional().describe('A note for the task.'),
});

const MarkTaskDoneSchema = z.object({
  itemId: z.string().describe('The ID of the task to mark as done.'),
});

const CreateProjectSchema = z.object({
    title: z.string().describe('The title of the project.'),
    day: z.string().optional().describe('The day the project is scheduled for (YYYY-MM-DD).'),
    parentId: z.string().optional().describe('The ID of the parent project or category.'),
    labelIds: z.array(z.string()).optional().describe('An array of label IDs.'),
    dueDate: z.string().optional().describe('The due date of the project (YYYY-MM-DD).'),
    timeEstimate: z.number().optional().describe('The estimated time in milliseconds.'),
    note: z.string().optional().describe('A note for the project.'),
});

const GetTodayItemsSchema = z.object({
  date: z.string().optional().describe('The date to get items for (YYYY-MM-DD). Defaults to today.'),
});

const GetDueItemsSchema = z.object({
  by: z.string().optional().describe('The date to get due items by (YYYY-MM-DD). Defaults to today.'),
});

// Create the MCP Server Instance
export const server = new McpServer(
  {
    name: 'marvin-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register Tools
server.registerTool(
  'createTask',
  {
    description: 'Creates a new task in Amazing Marvin.',
    inputSchema: CreateTaskSchema.shape,
  },
  async (params, extra: RequestHandlerExtra<any, any>) => {
    const task = CreateTaskSchema.parse(params);
    const { apiToken } = extra.context.headers as { apiToken: string };
    const response = await axios.post(`${MARVIN_API_URL}/addTask`, task, {
      headers: { 'X-API-Token': apiToken },
    });
    return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
  }
);

server.registerTool(
  'markTaskDone',
  {
    description: 'Marks a task as done.',
    inputSchema: MarkTaskDoneSchema.shape,
  },
  async (params, extra: RequestHandlerExtra<any, any>) => {
    const { itemId } = MarkTaskDoneSchema.parse(params);
    const { apiToken } = extra.context.headers as { apiToken: string };
    const response = await axios.post(`${MARVIN_API_URL}/markDone`, { itemId }, {
      headers: { 'X-API-Token': apiToken },
    });
    return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
  }
);

server.registerTool(
    'createProject',
    {
        description: 'Creates a new project.',
        inputSchema: CreateProjectSchema.shape,
    },
    async (params, extra: RequestHandlerExtra<any, any>) => {
        const project = CreateProjectSchema.parse(params);
        const { apiToken } = extra.context.headers as { apiToken: string };
        const response = await axios.post(`${MARVIN_API_URL}/addProject`, project, {
            headers: { 'X-API-Token': apiToken },
        });
        return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
    }
);

server.registerTool(
  'getTodayItems',
  {
    description: 'Gets tasks and projects scheduled for today.',
    inputSchema: GetTodayItemsSchema.shape,
  },
  async (params, extra: RequestHandlerExtra<any, any>) => {
    const { date } = GetTodayItemsSchema.parse(params);
    const { apiToken } = extra.context.headers as { apiToken: string };
    const response = await axios.get(`${MARVIN_API_URL}/todayItems`, {
      headers: { 'X-API-Token': apiToken },
      params: { date },
    });
    return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
  }
);

server.registerTool(
  'getDueItems',
  {
    description: 'Gets open tasks and projects that are due.',
    inputSchema: GetDueItemsSchema.shape,
  },
  async (params, extra: RequestHandlerExtra<any, any>) => {
    const { by } = GetDueItemsSchema.parse(params);
    const { apiToken } = extra.context.headers as { apiToken: string };
    const response = await axios.get(`${MARVIN_API_URL}/dueItems`, {
      headers: { 'X-API-Token': apiToken },
      params: { by },
    });
    return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
  }
);

server.registerTool(
  'getCategories',
  {
    description: 'Gets a list of all categories.',
    inputSchema: z.object({}).shape,
  },
  async (params, extra: RequestHandlerExtra<any, any>) => {
    const { apiToken } = extra.context.headers as { apiToken: string };
    const response = await axios.get(`${MARVIN_API_URL}/categories`, {
      headers: { 'X-API-Token': apiToken },
    });
    return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
  }
);

server.registerTool(
  'getLabels',
  {
    description: 'Gets a list of all labels.',
    inputSchema: z.object({}).shape,
  },
  async (params, extra: RequestHandlerExtra<any, any>) => {
    const { apiToken } = extra.context.headers as { apiToken: string };
    const response = await axios.get(`${MARVIN_API_URL}/labels`, {
      headers: { 'X-API-Token': apiToken },
    });
    return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] };
  }
);