FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000
ENV API_HOST backend
ENV API_PORT 8080

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install --production

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]