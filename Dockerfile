FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm i tsc -g
RUN npm run tsc
EXPOSE 3000
CMD ["node", "build/src/index.js"]