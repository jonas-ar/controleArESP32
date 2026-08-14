FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY package.json package-lock.json ./

RUN npm ci

RUN npm ci && chown -R node:node /app

COPY . .

EXPOSE 8081

CMD ["npm", "run", "start"]
