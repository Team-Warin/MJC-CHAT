# 베이스 이미지 설정
FROM node:20-alpine AS base

# 작업 디렉토리 설정
WORKDIR /app

# pnpm 설치
RUN corepack enable

# 의존성 설치 단계
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 빌드 단계
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build

# 런타임 단계
FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]