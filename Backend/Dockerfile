FROM node:16.13.1-alpine3.13 as base
WORKDIR /src
COPY package*.json /
EXPOSE 3000

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . .
CMD ["nodemon", "bin/www"]