FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install && npm install -g @expo/ngrok

COPY . .

EXPOSE 8081

CMD ["npm", "run", "start"]
