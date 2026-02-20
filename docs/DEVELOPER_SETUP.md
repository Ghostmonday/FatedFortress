# Developer Setup Guide

This guide covers how to set up and develop The Void locally.

## Prerequisites

- **Node.js** 20 or higher
- **pnpm** 9 or higher (monorepo package manager)
- **Redis** (optional, for distributed locking in Reaper)

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Generate Prisma client
pnpm prisma generate

# 3. Push database schema
pnpm prisma db push

# 4. Start development
pnpm dev
```

## Project Structure

```
fatedfortress/
├── apps/              # Deployable applications
│   ├── web/          # Next.js frontend
│   ├── server/      # Main server entry
│   └── swarm/       # Load testing / simulation
├── packages/         # Shared libraries
│   ├── @fated/
│   │   ├── simple-api/    # REST API (Fastify)
│   │   ├── xp-logic/      # XP & decay calculations
│   │   ├── matchmaker/    # Team formation
│   │   ├── db/            # Prisma/SQLite
│   │   ├── types/         # TypeScript types
│   │   └── events/        # Event sourcing
└── scripts/          # Build utilities
```

## Running Services

### API Server
```bash
pnpm start:api
# Runs on http://localhost:3000
```

### Frontend
```bash
pnpm dev:web
# Runs on http://localhost:3001
```

### Full Stack
```bash
pnpm dev
# Runs both API and frontend
```

## Database

The project uses **SQLite** with **Prisma ORM**.

### Commands
```bash
# Generate Prisma client (after schema changes)
pnpm prisma generate

# Push schema to database
pnpm prisma db push

# Open Prisma Studio (visual DB editor)
pnpm prisma studio

# Reset database (⚠️ deletes all data)
pnpm prisma db push --force-reset
```

### Schema Location
- Main schema: `packages/db/prisma/schema.prisma`
- API-specific: `packages/simple-api/prisma/schema.prisma`

## Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test --coverage

# Run specific package tests
pnpm --filter @fated/matchmaker test
pnpm --filter @fated/xp-logic test
```

## Environment Variables

Create a `.env` file in the root:

```bash
# Database
DATABASE_URL="file:./dev.db"

# API
PORT=3000

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# Reaper settings
REAPER_INTERVAL_MS=300000
REAPER_SLASH_PERCENT=0.5
```

## Common Tasks

### Adding a New Package
```bash
mkdir packages/@fated/new-package
cd packages/@fated/new-package
pnpm init
# Then add to pnpm-workspace.yaml
```

### Adding a New API Endpoint
Edit `packages/simple-api/src/index.ts`:

```typescript
fastify.get('/my-endpoint', async (request) => {
  // Your handler logic
  return { result: 'data' };
});
```

### Running the Reaper Manually
```bash
curl -X POST http://localhost:3000/admin/reaper
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Prisma Errors
```bash
# Clean install
pnpm clean
pnpm install
pnpm prisma generate
pnpm prisma db push
```

### TypeScript Errors
```bash
# Rebuild types
pnpm build
# Or run TypeScript in watch mode
pnpm --filter @fated/types exec tsc --watch
```

## Next Steps

- Read [README.md](../README.md) for architecture overview
- Check [API Documentation](../README.md#api-surface) for endpoint details
- Explore the `packages/` directory for domain logic
