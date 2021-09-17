# the first image use node image as the builder because it has git program
FROM node:14.15 as builder

WORKDIR /app

COPY ./package*.json ./

RUN yarn

COPY . .

ENV NODE_ENV="prod"
ENV TS_NODE_TRANSPILE_ONLY="true"

RUN yarn global add ts-node

ENTRYPOINT TS_NODE_TRANSPILE_ONLY=true ts-node -r tsconfig-paths/register src/index.ts
