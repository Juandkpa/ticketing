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

FROM shared as tickets
COPY packages/tickets/package.json ./packages/tickets/
RUN yarn --prod
COPY packages/tickets/ ./packages/tickets/
CMD ["yarn", "start:tickets"]

FROM shared as orders
COPY packages/orders/package.json ./packages/orders/
RUN yarn --prod
COPY packages/orders/ ./packages/orders/
CMD ["yarn", "start:orders"]

FROM shared as payments
COPY packages/payments/ ./packages/payments/
RUN yarn --prod
COPY packages/payments/ ./packages/payments/
CMD ["yarn", "start:payments"]

FROM shared as expiration
COPY packages/expiration/package.json ./packages/expiration/
RUN yarn --prod
COPY packages/expiration/ ./packages/expiration/
CMD ["yarn", "start:expiration"]


FROM base as client
COPY packages/client/package.json ./packages/client/
RUN yarn
COPY packages/client/ ./packages/client/
CMD ["yarn", "dev:client"]

