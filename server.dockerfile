FROM node:22-alpine AS base
WORKDIR /server
COPY ./nest-server/package* ./
COPY ./.env ./

FROM base AS dependencies
WORKDIR /server
RUN npm install

FROM base AS builder
WORKDIR /server
COPY ./nest-server ./
COPY --from=dependencies /server/node_modules ./node_modules
RUN npx prisma generate
RUN npm run build

FROM base AS development
WORKDIR /server
COPY --from=dependencies /server/node_modules ./node_modules
COPY ./nest-server ./
CMD npx prisma migrate dev && npm run start:dev

FROM base AS production
WORKDIR /server
COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/dist ./dist
CMD npx prisma migrate deploy && node dist/main.js
