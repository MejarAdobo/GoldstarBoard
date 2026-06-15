FROM oven/bun:latest

ENV TZ=Canada/Vancouver

WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --production
COPY . .

CMD ["bun", "src/server.ts"]
