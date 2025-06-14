# Stage 1: Build the Angular application
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run ng build -- --configuration production --output-path=dist/

# Stage 2: Serve with nginx
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy built application from builder stage
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make entrypoint script executable
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Default command (will be executed by entrypoint)
CMD ["nginx", "-g", "daemon off;"]