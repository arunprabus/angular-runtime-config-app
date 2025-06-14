#!/bin/sh
# ensure assets dir exists
mkdir -p /usr/share/nginx/html/assets

# generate the runtime config from env vars
envsubst < /usr/share/nginx/html/assets/runtime-config.json.template \
        > /usr/share/nginx/html/assets/runtime-config.json

# launch nginx in foreground
exec nginx -g 'daemon off;'
