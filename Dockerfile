FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install - force

# Copy app source code to the working directory
COPY . .

# Build the app
RUN npm run build

# Use NGINX as the production server
FROM nginx:1.21-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the build stage to NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]