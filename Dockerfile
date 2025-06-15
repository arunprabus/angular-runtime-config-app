# Stage 1: Use Node.js 20 to build Angular app
FROM node:20.19.1-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy entire source code (after dependencies)
COPY . .

# Build Angular app
#RUN npm run build --configuration production && \
#    echo "📁 Contents of /app/dist:" && ls -la /app/dist && \
#    echo "📁 Contents of /app/dist/angular-runtime-config-app:" && ls -la /app/dist/angular-runtime-config-app

RUN npm run build && \
    echo "📁 Contents of /app/dist:" && ls -la /app/dist && \
    echo "📁 Contents of /app/dist/angular-runtime-config-app:" && ls -la /app/dist/angular-runtime-config-app


# Stage 2: Serve using nginx
FROM nginx:alpine

# Install envsubst and jq
RUN apk add --no-cache gettext jq

# Copy nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built app from previous stage
COPY --from=build /app/dist/angular-runtime-config-app /usr/share/nginx/html

# Copy runtime config template
COPY src/assets/runtime-config.json.template /usr/share/nginx/html/assets/runtime-config.json.template

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Environment variables (can be overridden at runtime)
ENV API_URL=http://localhost:3000/api
ENV APP_NAME="Angular Runtime Config App"
ENV NODE_ENV=production

# Expose port
EXPOSE 80

# Use entrypoint to inject runtime config
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
