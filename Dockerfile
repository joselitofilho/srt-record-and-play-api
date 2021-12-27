FROM node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package.json /home/node

RUN npm install

COPY . /home/node
RUN npm run build

# ---

FROM node:14-alpine

RUN apk update && apk add bash
ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/
COPY --from=builder /home/node/ormconfig.js /home/node/ormconfig.js

EXPOSE 3000

CMD ["node", "dist/main.js"]