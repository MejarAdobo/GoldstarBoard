FROM oven/bun:1-slim AS base
WORKDIR /app
RUN bun add -g turbo

FROM base AS prepare
COPY . .
RUN turbo prune web --docker

FROM base AS builder
ARG API_URL
ENV API_URL=$API_URL

COPY --from=prepare /app/out/json/ .
RUN bun install --frozen-lockfile

COPY --from=prepare /app/out/full/ .
RUN bun turbo run build --filter=web

FROM oven/bun:1-slim AS runtime
WORKDIR /app

COPY --from=builder /app/apps/web/build ./build

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["bun", "./build/index.js"]
