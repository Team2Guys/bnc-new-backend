FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 5002

CMD ["sh", "-c", "npx prisma generate && node dist/src/main"]
