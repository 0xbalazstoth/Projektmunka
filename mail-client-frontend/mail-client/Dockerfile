FROM node:16-alpine

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i -g vite
RUN vite -v
RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]