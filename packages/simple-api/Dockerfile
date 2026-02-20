# The Void API - Dockerfile
# Production deployment

FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY packages/simple-api/package*.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY packages/simple-api/ ./

# Build TypeScript
RUN pnpm build

# Expose port
EXPOSE 3000

# Start server
CMD ["pnpm", "start"]
