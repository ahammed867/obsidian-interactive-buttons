# Interactive Buttons for Obsidian - Development Context

## Project Overview
Building an Obsidian plugin that transforms Markdown notes into interactive dashboards with secure local script execution.

## Core Features
- Button syntax: `[![Label] Button: !python "script.py" --args]`
- Secure Python script execution with permission system
- Professional dashboard UI with multiple themes
- Enterprise-grade security and audit trails
- Freemium business model targeting business users

## Current Project Structure
obsidian-interactive-buttons/
├── src/
│   └── main.ts (basic plugin structure exists)
├── styles/
├── scripts/
├── examples/
├── docs/
├── package.json (configured)
├── tsconfig.json (configured)
├── manifest.json (configured)
├── esbuild.config.mjs (configured)
└── README.md (basic)

## Tech Stack
- TypeScript + Node.js
- Obsidian Plugin API
- esbuild for building
- Python script execution via child_process
- CSS for professional styling

## Target Users
- Business professionals using Obsidian
- Consultants, analysts, researchers
- Non-technical users who want automation
- Enterprise teams needing secure automation

## Key Differentiators
- UI-first approach (buttons vs code blocks)
- Security-first design for enterprise use
- Non-technical user friendly
- Professional dashboard appearance
- Business revenue model

## Development Priorities
1. Type definitions and interfaces
2. Button parser (markdown syntax recognition)
3. Script executor (secure Python execution)
4. UI renderer (professional button display)
5. Security system (permissions and validation)
6. Settings interface (configuration)
7. Testing and examples
