FROM node:alpine3.11
WORKDIR /UR-backend
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
ENTRYPOINT [ "npm", "run" ]
CMD ["dev"]