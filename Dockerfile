# -----------------------
# 1) Build Stage
# -----------------------
FROM node:20-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# plain browser build to dist/
RUN npm run build -- --configuration production

# -----------------------
# 2) Runtime Stage
# -----------------------
FROM nginx:alpine

# 2a) override default
COPY default.conf /etc/nginx/conf.d/default.conf

# 2b) copy flat dist/ → html root
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# 2c) copy entrypoint (no need to mkdir-assets—it's already there)
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
