FROM node:lts-alpine
WORKDIR /green-run
COPY . .
RUN npm install
RUN npm i tsc -g
RUN npm run tsc
EXPOSE 3000
CMD ["npm", "run", "start"]