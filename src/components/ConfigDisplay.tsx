import { CheckCircle, XCircle, Settings } from 'lucide-react';
import { useRuntimeConfig } from '../hooks/useRuntimeConfig';

export const ConfigDisplay = () => {
  const { config } = useRuntimeConfig();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-800">Application Configuration</h2>
        <CheckCircle className="h-5 w-5 text-green-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">App Name</label>
            <p className="text-gray-900">{config.appName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">API URL</label>
            <p className="text-gray-900 break-all">{config.apiUrl}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Environment</label>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              config.environment === 'production' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {config.environment}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Version</label>
            <p className="text-gray-900">{config.version}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Features</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {Object.entries(config.features).map(([feature, enabled]) => (
                <span
                  key={feature}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    enabled 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {enabled ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Build Time</label>
            <p className="text-gray-900 text-sm">{config.buildTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Configuration is loaded from default values. 
          In Docker, this would be populated from environment variables via runtime-config.json.
        </p>
      </div>
    </div>
  );
};