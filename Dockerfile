FROM node:lts as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm config set shell sh
RUN npm install
COPY ./ ./
CMD ["npm", "start"]
EXPOSE 3000
