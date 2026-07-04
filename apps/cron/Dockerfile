FROM oven/bun:alpine

WORKDIR /app

COPY . .

RUN bun install --production

CMD ["bun", "apps/cron/src/index.ts"]
