FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install --production

CMD ["bun", "src/index.ts"]
