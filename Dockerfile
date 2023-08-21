# For more info: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

# --platform=linux/amd64/v8 is reuiqred if deploying into Google Cloud Run, which currently only support amd64
FROM --platform=linux/amd64/v8 node:18-alpine AS deps 
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# FROM node:18-alpine AS builder
FROM --platform=linux/amd64/v8 node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Set build-time arguments. Add BUILD_ prefix to your enviornment variable
ARG BUILD_IMAGE_DOMAIN
ENV GCR_IMAGE_DOMAIN $BUILD_IMAGE_DOMAIN

ARG BUILD_HOSTNAME
ENV GCR_HOSTNAME $BUILD_HOSTNAME
ARG BUILD_EMAIL_SERVER_HOST
ENV GCR_EMAIL_SERVER_HOST $BUILD_EMAIL_SERVER_HOST

ARG BUILD_EMAIL_SERVER_PORT
ENV GCR_EMAIL_SERVER_PORT $BUILD_EMAIL_SERVER_PORT

ARG BUILD_EMAIL_FROM
ENV GCR_EMAIL_FROM $BUILD_EMAIL_FROM
ARG BUILD_SOCIAL_GITHUB
ENV GCR_SOCIAL_GITHUB $BUILD_SOCIAL_GITHUB


RUN yarn build

FROM --platform=linux/amd64/v8 node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public/ ./public


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
