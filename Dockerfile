FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle nestjs source
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 3000

# Run the app
CMD [ "npm", "run", "start:prod" ]