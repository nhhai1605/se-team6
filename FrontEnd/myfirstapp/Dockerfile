FROM node:14 as build
WORKDIR /src/app
COPY package*.json ./

RUN npm cache clean --force
RUN npm i
RUN npm install -g npm@8.1.1
COPY . .
EXPOSE 80
EXPOSE 3000
CMD ["npm","start"]
