#!/bin/sh

# Create runtime configuration from environment variables
cat <<EOF > /usr/share/nginx/html/assets/runtime-config.json
{
  "apiUrl": "${API_URL:-http://localhost:3000}",
  "appName": "${APP_NAME:-Angular Runtime Config App}"
}
EOF

echo "Runtime configuration created:"
cat /usr/share/nginx/html/assets/runtime-config.json

# Execute the passed command (nginx)
exec "$@"