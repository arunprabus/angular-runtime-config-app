# -----------------------
# 1) Build Stage
# -----------------------
FROM node:20-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source & build Angular
COPY . .
RUN npm run build -- --configuration production

# -----------------------
# 2) Runtime Stage
# -----------------------
FROM nginx:alpine

# Drop in custom NGINX config
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the Angular build output
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Ensure assets folder exists before templating
RUN mkdir -p /usr/share/nginx/html/assets

# Copy the config template and entrypoint
COPY runtime-config.json.template /usr/share/nginx/html/assets/
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
