FROM node:19-alpine

WORKDIR /Backend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]