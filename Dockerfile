FROM node:24-slim AS builder

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM node:24-slim

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

CMD ["node_modules/.bin/tsx", "src/server/index.ts"]
