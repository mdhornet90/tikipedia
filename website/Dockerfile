FROM node:20-alpine as base-website

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --pure-lockfile

# COPY .env.example .
COPY tsconfig.json .

FROM node:20-alpine as dev

WORKDIR /app

COPY --from=base-website /app/node_modules ./node_modules
# COPY .env* ./
COPY package.json .
COPY package-scripts ./package-scripts

CMD ["yarn", "start"]