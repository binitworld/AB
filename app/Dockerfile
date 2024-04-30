# Use a lightweight Node.js image as the base
FROM nginx:alpine

# Set the working directory for the Node.js application
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json files
# COPY package*.json ./

# # Install Node.js dependencies
# RUN npm install

# Copy the entire application directory into the Docker image
COPY . /usr/share/nginx/html/

# # Expose port 3000 (for Node.js)
# EXPOSE 3000

# # Start the Node.js server
# CMD ["node", "script.js"]
