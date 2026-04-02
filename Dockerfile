FROM node:24-alpine

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build && rm -rf .git .github .claude

EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=production

CMD ["node_modules/.bin/tsx", "src/server/index.ts"]
