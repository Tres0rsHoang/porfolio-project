FROM node:22-alpine AS base
WORKDIR /server
COPY ./nest-server/package* ./
COPY ./.env ./

FROM base AS dependencies
WORKDIR /server
RUN apk update && apk upgrade && npm install

FROM base AS builder
WORKDIR /server
COPY --from=dependencies /server/node_modules ./node_modules
COPY ./nest-server ./
RUN npm run build
RUN npm ci --only=production && npm cache clean --force
RUN npx prisma generate
RUN npm run seed

FROM base AS development
WORKDIR /server
COPY --from=dependencies /server/node_modules ./node_modules
COPY ./nest-server ./

CMD npx prisma migrate dev && npm run start:dev

FROM base AS production
WORKDIR /server
COPY --from=build /server/node_modules ./node_modules
COPY --from=build /server/dist ./dist

CMD npx prisma migrate deploy && node dist/main.js
