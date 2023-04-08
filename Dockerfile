# For more info: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

# WARN:
# If the local machine is based on Apple silicon, such as Macbook M1, it is required to add 
# `--platform=linux/amd64` as shown below. Your build command is still the same as before as 
# long as the `--platform` flag is specified. 
# The example of docker build `docker build -t [docker image] [path]` 


# FROM node:18-alpine AS deps
FROM --platform=linux/amd64 node:18-alpine AS deps 
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
FROM --platform=linux/amd64 node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

################################################################################ 
################# Enviornment Variable Build Time Substitution #################
################################################################################
# NOTE:
# When environment variables are added to Google Cloud Run's environment, 
# they are only available at runtime and not during build time. However, 
# Next.js may require environment variables during build time. To address 
# this issue, build-time substitution can be used to temporarily hold the 
# substitution and get replaced with Google Cloud Run's environment variables 
# during deployment with deploy.sh.
# --
# It's important to note that environment variables defined in Google Secret 
# Manager are available at both build time and runtime, but they may not be 
# free to use.
#
# Set build-time arguments. Add BUILD_ prefix to your enviornment variable
ARG BUILD_IMAGE_DOMAIN
ARG BUILD_HOSTNAME
#
ARG BUILD_EMAIL_SERVER_HOST
ARG BUILD_EMAIL_SERVER_PORT
ARG BUILD_EMAIL_FROM
#
ARG BUILD_SOCIAL_GITHUB
#
# Set environment variables based on build-time arguments by adding GCR_ prefix
ENV GCR_IMAGE_DOMAIN $BUILD_IMAGE_DOMAIN
ENV GCR_HOSTNAME $BUILD_HOSTNAME
#
ENV GCR_EMAIL_SERVER_HOST $BUILD_EMAIL_SERVER_HOST
ENV GCR_EMAIL_SERVER_PORT $BUILD_EMAIL_SERVER_PORT
ENV GCR_EMAIL_FROM $BUILD_EMAIL_FROM
#
ENV GCR_SOCIAL_GITHUB $BUILD_SOCIAL_GITHUB
################################################################################


RUN yarn build

# FROM node:18-alpine AS runner
FROM --platform=linux/amd64 node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env

# Check if the public folder exists before copying
RUN if [ -d /app/public ]; then \
  COPY --from=builder /app/public ./public; \
fi

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
