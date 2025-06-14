#!/bin/sh
set -eux  # fail on error, print commands, treat unset as error

echo "1) Creating assets folder…"
mkdir -p /usr/share/nginx/html/assets

echo "2) Rendering runtime-config.json from env vars…"
envsubst '$API_URL $APP_NAME' \
  < /usr/share/nginx/html/assets/runtime-config.json.template \
  > /usr/share/nginx/html/assets/runtime-config.json

echo "3) Dumping the generated config:"
cat /usr/share/nginx/html/assets/runtime-config.json

echo "4) Starting nginx…"
exec nginx -g 'daemon off;'
