FROM node:22-slim AS base
WORKDIR /app
COPY ./next-app/package* ./
COPY ./.env ./

FROM base AS dependencies
WORKDIR /app
RUN npm install --legacy-peer-deps

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLE=1
WORKDIR /app
COPY ./next-app ./
COPY --from=dependencies /app/node_modules ./node_modules
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

ENV NEXT_TELEMETRY_DISABLE=1 
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/cache ./.next/cache
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/tsconfig.json ./

CMD ["node", "server.js"]
