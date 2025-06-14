# ------------------------------
# 1) Build Stage
# ------------------------------
FROM node:20-slim AS builder
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm ci

# build the Angular app
COPY . .
RUN npm run build -- --configuration production --output-path=dist/

# ------------------------------
# 2) Run Stage
# ------------------------------
FROM nginx:alpine

# 2a) custom site config
COPY default.conf /etc/nginx/conf.d/default.conf

# 2b) copy built Angular app (flat dist/)
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# 2c) copy runtime template & entrypoint
COPY runtime-config.json.template /usr/share/nginx/html/assets/
COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
