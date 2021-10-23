FROM node:14 as build
WORKDIR /src/app
COPY package*.json ./
# ENV PATH /app/node_modules/.bin:$PATH
RUN npm cache clean --force
RUN npm i
RUN npm install -g npm@8.1.1
COPY . .
# RUN npm run build
EXPOSE 80
EXPOSE 5000

CMD ["npm", "start"]
