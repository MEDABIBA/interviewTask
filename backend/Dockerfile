FROM node:16 AS development

ENV NODE_ENV=development

WORKDIR /usr/src/backend

COPY .sequelizerc ./
COPY package*.json ./

RUN npm ci
COPY . .

EXPOSE 8080

CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]