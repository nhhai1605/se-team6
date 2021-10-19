FROM node:16-alpine3.11
WORKDIR /src/app
COPY package*.json ./
RUN npm install -g npm@7.24.0
COPY . .
EXPOSE 3000
CMD ["npm", "start"]