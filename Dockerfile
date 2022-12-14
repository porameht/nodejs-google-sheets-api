FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN npm install 

COPY . .

CMD ["node","main.js"]