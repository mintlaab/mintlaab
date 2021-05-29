FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN apk add --update python make g++\
   && rm -rf /var/cache/apk/*
RUN npm install
COPY frontend/ ./
CMD ["npm", "start"]
EXPOSE 3000
