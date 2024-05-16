FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=1337

ENV NODE_ENV=development


EXPOSE 1337

CMD ["npm", "start"]