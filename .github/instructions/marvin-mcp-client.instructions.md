# Marvin MCP Client Instructions

## Events

- When creating or updating events, always ask the user for their timezone. Do not assume UTC.
- Before creating or updating an event, check for any conflicting events. If a conflict is found, inform the user and ask for confirmation before proceeding.

## Tasks

- When displaying tasks and projects, use the following symbols before the name:
  - `▶` for the currently tracked task.
  - `☑` for completed tasks and projects.
  - `☐` for open tasks, or open projects with open tasks in them.
  - `◼` for open projects with no open tasks.
- Write Category names in parentheses and project names in bold.
- When referring to a task without its parent, prepend its parent projects or categories to the task's name, separated by `➧`. For example: `☐ Project A ➧ ☐ Sub-project B ➧ ☑ Task C`. This can be omitted if the context makes the hierarchy clear.
