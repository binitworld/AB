FROM node:20-alpine

WORKDIR /BACKEND

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "./script.js"]
