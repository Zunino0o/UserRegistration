FROM node:alpine3.11
WORKDIR /usr/code
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "start"]