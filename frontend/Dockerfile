FROM node:alpine3.11
WORKDIR /UR-frontend
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run" ]
CMD ["start"]