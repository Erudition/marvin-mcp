## Project Description
The goal of this project is to build a Model Context Protocol (MCP) server for the task management application "Amazing Marvin". The server should be written in TypeScript and use the official `@modelcontextprotocol/sdk`. It will expose tools that correspond to the Amazing Marvin API, allowing a conversational AI to interact with a user's Marvin data. The server should be robust, well-typed, and follow the code style guidelines outlined in this document.


## Execution Guidelines
**MCP Development Note:** The `resources/` directory contains local clones of the MCP specification, example servers, and the TypeScript SDK. Always consult these local resources as the primary source of truth before making changes to the MCP server implementation.

**Terminal Execution Note:** When running a background process (like a development server) and a subsequent command (like a test), combine them into a single `run_in_terminal` call using `&` to ensure the background process is not terminated. For example: `npm start & sleep 5 && curl ...`

PROGRESS TRACKING:
- If any tools are available to manage the above todo list, use it to track progress through this checklist.
- After completing each step, mark it complete and add a summary.
- Read current todo list status before starting each new step.

COMMUNICATION RULES:
- Avoid verbose explanations or printing full command outputs.
- If a step is skipped, state that briefly (e.g. "No extensions needed").
- Do not explain project structure unless asked.
- Keep explanations concise and focused.

DEVELOPMENT RULES:
- **File Editing:** When replacing the entire content of a file, the `replace_string_in_file` tool can be unreliable. It is better to use the `insert_edit_into_file` tool to ensure the change is applied correctly.
- **Code Style:**
  - Use ES modules with `.js` extension in import paths.
  - Strictly type all functions and variables with TypeScript.
  - Follow zod schema patterns for tool input validation.
  - Prefer async/await over callbacks and Promise chains.
  - Place all imports at top of file, grouped by external then internal.
  - Use descriptive variable names that clearly indicate purpose.
  - Implement proper cleanup for timers and resources in server shutdown.
  - Follow camelCase for variables/functions, PascalCase for types/classes, UPPER_CASE for constants.
  - Handle errors with try/catch blocks and provide clear error messages.
  - Use consistent indentation (2 spaces) and trailing commas in multi-line objects.
- Use '.' as the working directory unless user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- Use VS Code API tool only for VS Code extension projects.
- Once the project is created, it is already opened in Visual Studio Code—do not suggest commands to open this project in Visual Studio again.
- If the project setup information has additional rules, follow them strictly.

FOLDER CREATION RULES:
- Always use the current directory as the project root.
- If you are running any terminal commands, use the '.' argument to ensure that the current working directory is used ALWAYS.
- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.
- If any of the scaffolding commands mention that the folder name is not correct, let the user know to create a new folder with the correct name and then reopen it again in vscode.

EXTENSION INSTALLATION RULES:
- Only install extension specified by the get_project_setup_info tool. DO NOT INSTALL any other extensions.

PROJECT CONTENT RULES:
- If the user has not specified project details, assume they want a "Hello World" project as a starting point.
- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.
- Avoid generating images, videos, or any other media files unless explicitly requested.
- If you need to use any media assets as placeholders, let the user know that these are placeholders and should be replaced with the actual assets later.
- Ensure all generated components serve a clear purpose within the user's requested workflow.
- If a feature is assumed but not confirmed, prompt the user for clarification before including it.
- If you are working on a VS Code extension, use the VS Code API tool with a query to find relevant VS Code API references and samples related to that query.

TASK COMPLETION RULES:
- Your task is complete when:
  - Project is successfully scaffolded and compiled without errors
  - copilot-instructions.md file in the .github directory exists in the project
  - README.md file exists and is up to date
  - User is provided with clear instructions to debug/launch the project

Before starting a new task in the above plan, update progress in the plan.

- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.
