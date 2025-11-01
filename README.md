# Marvin MCP Server

This is a Model Context Protocol (MCP) server for Amazing Marvin, built with TypeScript and Express.

## Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)

## Getting Started

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file:**
   Create a `.env` file in the root of the project and add your Amazing Marvin API tokens:
   ```
   MARVIN_API_TOKEN=your_api_token_here
   MARVIN_FULL_ACCESS_TOKEN=your_full_access_token_here
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The server will be running at `http://localhost:3000`.

### Docker Deployment

1. **Build the Docker image:**
   ```bash
   docker build -t marvin-mcp-server .
   ```

2. **Run the Docker container:**
   ```bash
   docker run -d -p 3000:3000 \
     -e MARVIN_API_TOKEN=your_api_token_here \
     -e MARVIN_FULL_ACCESS_TOKEN=your_full_access_token_here \
     --name marvin-mcp-server \
     marvin-mcp-server
   ```

## Authentication

The server can be authenticated in the following ways:

1.  **Environment Variables (recommended for production/Docker):**
    - `MARVIN_API_TOKEN`: Your Amazing Marvin API token.
    - `MARVIN_FULL_ACCESS_TOKEN`: Your Amazing Marvin full access token.

2.  **HTTP Headers:**
    - `Authorization: Bearer <your_api_token>`
    - `x-api-token`: Your Amazing Marvin API token.
    - `x-full-access-token`: Your Amazing Marvin full access token.

## Building for Production

1. **Build the TypeScript code:**
   ```bash
   npm run build
   ```
   This will compile the TypeScript code into JavaScript in the `dist` directory.

2. **Run the production server:**
   ```bash
   npm run serve
   ```

