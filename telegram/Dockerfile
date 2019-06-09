FROM node:12.4-slim

WORKDIR /usr/src/app
COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json

RUN npm install
VOLUME /usr/src/app/node_modules
