FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon

EXPOSE 6200
CMD [ "npm", "run", "dev" ]
