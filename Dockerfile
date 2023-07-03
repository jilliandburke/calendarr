FROM node:lts-alpine

# RUN npm install -g http-server

WORKDIR /app
COPY package*.json express.ts ./
RUN yarn install
COPY . .
COPY db ./db
RUN yarn build
RUN yarn knex migrate:latest

EXPOSE 5173
CMD ["yarn", "production"]
