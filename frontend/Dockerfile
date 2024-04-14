FROM node:20.11.0-alpine
RUN mkdir -p frontend
WORKDIR /frontend

COPY package*.json .
RUN npm install

EXPOSE 3000

COPY . .
CMD [ "npm", "run", "dev" ]
