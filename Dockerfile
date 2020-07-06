FROM node:alpine as base
WORKDIR /app
COPY package.json .

FROM base as shared
COPY packages/common/package.json ./packages/common/
COPY packages/common/ ./packages/common/

FROM shared as auth
COPY packages/auth/package.json ./packages/auth/
RUN yarn --prod
COPY packages/auth/ ./packages/auth/
CMD ["yarn", "start:auth"]

FROM base as client
COPY packages/client/package.json ./packages/client/
RUN yarn
COPY packages/client/ ./packages/client/
CMD ["yarn", "dev:client"]

