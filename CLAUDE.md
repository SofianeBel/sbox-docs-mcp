# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**sbox-docs-mcp** — MCP server that exposes s&box (Facepunch Studios) documentation to AI assistants. Three tools: search docs, fetch pages, query API types. Currently scaffolded with TODO stubs — implementation pending.

See `Spec.md` for full specification (research, architecture, schemas, roadmap).

## Commands

```bash
npm run build        # Compile TypeScript to dist/
npm run dev          # Watch mode (tsc --watch)
npm start            # Run the MCP server (stdio transport)
npx tsc --noEmit     # Type-check without emitting
```

## Architecture

```
src/
├── index.ts              # Entry point — McpServer + 3 tool registrations
├── schemas/index.ts      # Zod schemas for all tool inputs (source of truth)
├── tools/
│   ├── search-docs.ts    # sbox_docs_search → uses SearchIndex
│   ├── get-page.ts       # sbox_docs_get_page → uses fetcher + Cache
│   └── get-api-type.ts   # sbox_api_get_type → uses fetcher + Cache
└── lib/
    ├── cache.ts          # In-memory LRU cache with TTL expiration
    ├── fetcher.ts        # HTTP fetch + HTML→Markdown (cheerio + turndown)
    └── search-index.ts   # Full-text search index (minisearch)
```

**Data flow:** Tool receives validated params → checks Cache → on miss, Fetcher scrapes source → converts HTML to Markdown → stores in Cache → returns to MCP client.

**Documentation sources:**
- `docs.facepunch.com/s/sbox-dev` — narrative docs (HTML, direct fetch)
- `sbox.game/api` — API reference (JS-rendered, needs alternative strategy — see Spec.md §3)

## Key Patterns

- **ESM only** — `"type": "module"` in package.json, use `.js` extensions in imports
- **MCP SDK** — `@modelcontextprotocol/sdk`, tools registered via `server.tool(name, description, schema.shape, handler)`
- **Zod schemas** — defined in `src/schemas/index.ts`, tool handlers receive pre-validated params
- **Transport** — stdio (StdioServerTransport) for universal client compatibility

## Environment Variables

All optional with sensible defaults — see `.env.example`:
- `SBOX_DOCS_CACHE_TTL` — cache TTL in seconds (default: 14400 = 4h)
- `SBOX_DOCS_MAX_CACHE_ENTRIES` — LRU cache limit (default: 500)
- `SBOX_DOCS_REQUEST_TIMEOUT` — HTTP timeout in ms (default: 10000)
- `SBOX_DOCS_USER_AGENT` — User-Agent header for requests
