FROM node:20-alpine as base-api

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --pure-lockfile

COPY .env.example .
COPY tsconfig.json .

FROM node:20-alpine as dev

WORKDIR /app

COPY --from=base-api /app/node_modules ./node_modules
COPY .env* ./
COPY nodemon.json .
COPY package.json .

CMD ["yarn", "dev"]