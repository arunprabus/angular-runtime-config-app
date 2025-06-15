#!/bin/sh
set -eux; envsubst '$API_URL $APP_NAME' < /usr/share/nginx/html/assets/runtime-config.json.template > /usr/share/nginx/html/assets/runtime-config.json; exec nginx -g 'daemon off;'
