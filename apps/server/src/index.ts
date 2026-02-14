/**
 * @fated/server
 * Server entry point - re-exports the API
 */

// Re-export everything from @fated/api
// This allows running via: pnpm --filter @fated/server dev

import './../../packages/api/src/index.ts';
