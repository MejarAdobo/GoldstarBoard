FROM oven/bun:alpine AS pruner
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune --scope=cron --docker

FROM oven/bun:alpine AS runner
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock* ./

RUN bun install --production --no-cache

COPY --from=pruner /app/out/full/ .

CMD ["bun", "apps/cron/src/index.ts"]
