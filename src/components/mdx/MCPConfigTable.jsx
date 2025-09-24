import React from 'react';

const MCPConfigTable = () => {
  const scenarios = [
    {
      scenario: "Local HTTP (dev)",
      config: "mcp-remote http://localhost:3000/mcp 9696 --transport http-only",
      notes: "MCP on localhost:3000, Auth on localhost:4000. Great for testing."
    },
    {
      scenario: "Remote HTTPS",
      config: "mcp-remote https://mcp.your-domain.com/mcp 9696 --transport http-only",
      notes: "Use when server is deployed to Vercel, Railway, EC2, etc. Requires HTTPS + .well-known."
    },
    {
      scenario: "Pure STDIO (no remote)",
      config: "node ./server.js --transport=stdio",
      notes: "Direct connection to your server's stdio. Fastest dev loop. No HTTP bridge."
    },
    {
      scenario: "LangGraph / Agentic AI",
      config: "new MultiServerMCPClient({ mcpServers: { ... }})",
      notes: "Works with both mcp-remote (HTTP bridge) and pure stdio. Auto-discovers tools."
    }
  ];

  return (
    <div className="w-full overflow-x-auto my-8">
      <div className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Scenario
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Config Example
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-200 dark:border-gray-700">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {scenarios.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.scenario}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono break-all">
                      {item.config}
                    </code>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile view - Stacked cards */}
      <div className="block md:hidden space-y-4 mt-4">
        {scenarios.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              {item.scenario}
            </h4>
            <div className="mb-3">
              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-mono break-all block">
                {item.config}
              </code>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {item.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCPConfigTable;
