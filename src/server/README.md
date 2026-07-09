# Server (Phase 2)

Scaffolded folder structure for backend logic. Endpoints will be exposed via
TanStack Start `createServerFn` (client-callable RPCs) and `src/routes/api/*`
(public HTTP routes). Populate:

- **/routes** — TanStack file-based HTTP endpoints (webhooks, public APIs).
- **/controllers** — request handlers invoked by routes/server-functions.
- **/middleware** — auth guards, rate limiting, logging.
- **/models** — data types, Zod schemas, DB row shapes.
- **/services** — third-party integrations, AI gateway clients, business logic.

Nothing here is wired in Phase 1.
