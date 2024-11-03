FROM node:lts-alpine3.20
WORKDIR /apps/nodecpucopy
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "index.js" ]

