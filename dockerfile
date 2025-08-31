FROM node:22-alpine AS base
WORKDIR /app
COPY ./next-app/package* ./
COPY ./.env ./

FROM base AS dependencies
WORKDIR /app
RUN apk update && apk upgrade && npm install

FROM base AS builder
WORKDIR /app
COPY ./next-app ./
COPY --from=dependencies /app/node_modules ./node_modules
ENV NEXT_TELEMETRY_DISABLE=1
RUN npm run build

# DEV
FROM base AS development
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY ./next-app ./

CMD ["npm", "run", "dev"]

# PRODUCTION 
FROM base AS production
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLE=1 HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]
