FROM node:24-slim

RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/server/index.js"]
