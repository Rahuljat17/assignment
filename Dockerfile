# Use the official Node.js image from the Docker Hub
FROM node:18

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps
RUN npm i --force

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on (adjust if necessary)
EXPOSE 3000

# Define the command to run the app
ENV FAST_REFRESH=false
CMD ["npm", "start"]
