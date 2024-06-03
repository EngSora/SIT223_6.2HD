# Dockerfile for your Node.js application
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# New Relic setup
ENV NEW_RELIC_LICENSE_KEY='NRAK-L07EBEGPZXGH6PQTB6AWDG5UXRO'
ENV NEW_RELIC_APP_NAME='Blog Platform'

RUN npm install newrelic --save

# Add New Relic configuration
COPY newrelic.js .

EXPOSE 3000

CMD ["npm", "start"]
