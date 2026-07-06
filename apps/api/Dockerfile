FROM oven/bun:alpine

WORKDIR /app

COPY . .

RUN bun install --production

CMD ["bun", "apps/api/src/index.ts"]
