# Dockerfile for your Node.js application
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Install New Relic
RUN npm install newrelic --save

# Add New Relic configuration
COPY newrelic.js .

EXPOSE 3000

CMD ["npm", "start"]
