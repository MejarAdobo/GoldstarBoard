FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1-slim AS runtime
WORKDIR /app

COPY --from=builder /app/dist ./dist

ENV HOST=0.0.0.0

CMD ["bun", "./dist/server/entry.mjs"]
