import React from 'react';
import { ConfigDisplay } from './components/ConfigDisplay';
import { useRuntimeConfig } from './hooks/useRuntimeConfig';
import { Rocket, Code, Database, Shield } from 'lucide-react';

function App() {
  const { config } = useRuntimeConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Rocket className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">{config.appName}</h1>
          </div>
          <p className="text-xl text-gray-600">
            Production-ready React SPA with Docker runtime configuration
          </p>
        </div>

        {/* Configuration Display */}
        <ConfigDisplay />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Code className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Runtime Configuration</h3>
            <p className="text-gray-600 text-sm">
              Environment variables injected at container startup using envsubst templating
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Database className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Docker Ready</h3>
            <p className="text-gray-600 text-sm">
              Multi-stage Docker build with nginx serving optimized for production deployment
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Production Features</h3>
            <p className="text-gray-600 text-sm">
              Security headers, gzip compression, client-side routing, and health checks
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 Docker Commands</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Build the image:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
                docker build -t angular-runtime-config-app .
              </code>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Run with custom environment:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono break-all">
                docker run -p 8080:80 \<br />
                &nbsp;&nbsp;-e API_URL="https://api.example.com" \<br />
                &nbsp;&nbsp;-e APP_NAME="My Production App" \<br />
                &nbsp;&nbsp;angular-runtime-config-app
              </code>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Debug inside container:</h3>
              <code className="block bg-gray-100 p-3 rounded text-sm font-mono">
                docker exec -it &lt;container_id&gt; sh<br />
                cat /usr/share/nginx/html/assets/runtime-config.json
              </code>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Built with React + TypeScript + Vite + Docker + nginx</p>
        </div>
      </div>
    </div>
  );
}

export default App;