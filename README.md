# Angular Runtime Config App

An Angular 17 SPA that demonstrates runtime configuration loading from environment variables in a Docker container.

## Features

- Runtime configuration loading before app bootstrap
- ConfigService for accessing configuration values
- Two-stage Docker build with nginx
- Dynamic config generation from environment variables

## Development

```bash
npm install
npm start
```

## Docker Build and Run

### Build the image:
```bash
docker build -t angular-runtime-config-app .
```

### Run with environment variables:
```bash
docker run -d --name app -p 8080:80 \
  -e API_URL=https://api.example.com \
  -e APP_NAME="Angular Demo" \
  angular-runtime-config-app
```

### One-liner build and run:
```bash
docker build -t angular-runtime-config-app . && docker run -d --name app -p 8080:80 -e API_URL=https://api.example.com -e APP_NAME="Angular Demo" angular-runtime-config-app
```

## How it works

1. The Angular app loads `/assets/runtime-config.json` before bootstrapping
2. Configuration is stored in `window.__RUNTIME_CONFIG__`
3. ConfigService provides access to configuration values
4. Docker entrypoint script generates the config file from environment variables
5. No file system mounts required - everything is baked into the container

## Environment Variables

- `API_URL`: The API endpoint URL (default: http://localhost:3000)
- `APP_NAME`: The application name (default: Angular Runtime Config App)