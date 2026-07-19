FROM oven/bun:1 AS base
WORKDIR /app
RUN bun add -g turbo

FROM base AS prepare
COPY . .
RUN turbo prune web --docker

FROM base AS builder
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

COPY --from=prepare /app/out/json/ .
RUN bun install --frozen-lockfile

COPY --from=prepare /app/out/full/ .
RUN bun turbo run build --filter=web

FROM oven/bun:1-slim AS runtime
WORKDIR /app

COPY --from=builder /app/apps/web/dist ./dist

ENV HOST=0.0.0.0

CMD ["bun", "./dist/server/entry.mjs"]
