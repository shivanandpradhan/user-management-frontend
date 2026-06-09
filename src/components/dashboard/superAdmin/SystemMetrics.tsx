// import { getSystemMetrics } from "../../../api/system";
// import { useApiQuery } from "../../../hooks/useApi";

// const SystemMetrics = () => {
//   const { data, isLoading } = useApiQuery(["system-metrics"], getSystemMetrics);

//   if (isLoading) return <div>Loading metrics...</div>;

//   return (
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h2 className="text-lg font-medium mb-4">System Metrics</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="border rounded-lg p-4">
//           <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
//           <p className="text-2xl font-semibold">
//             {data?.data?.totalUsers || 0}
//           </p>
//         </div>
//         <div className="border rounded-lg p-4">
//           <h3 className="text-sm font-medium text-gray-500">Active Sessions</h3>
//           <p className="text-2xl font-semibold">
//             {data?.data?.activeSessions || 0}
//           </p>
//         </div>
//         <div className="border rounded-lg p-4">
//           <h3 className="text-sm font-medium text-gray-500">Storage Used</h3>
//           <p className="text-2xl font-semibold">
//             {data?.data?.storageUsed || 0} MB
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SystemMetrics;

import { getSystemMetrics } from "../../../api/system";
import { useApiQuery } from "../../../hooks/useApi";

const SystemMetrics = () => {
  const { data, isLoading } = useApiQuery(["system-metrics"], getSystemMetrics);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  const metrics = [
    {
      title: "Total Users",
      value: data?.data?.totalUsers || 0,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Sessions",
      value: data?.data?.activeSessions || 0,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      change: "+5%",
      trend: "up",
    },
    {
      title: "Storage Used",
      value: `${data?.data?.storageUsed || 0} MB`,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
      change: "3%",
      trend: "neutral",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">System Overview</h2>
        <p className="text-sm text-gray-500 mt-1">
          Key performance metrics at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {metrics.map((metric, index) => (
          <div key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">
                {metric.title}
              </h3>
              <div
                className={`flex items-center text-xs font-medium ${
                  metric.trend === "up"
                    ? "text-green-600"
                    : metric.trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {metric.change}
                {metric.trend === "up" && (
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                )}
                {metric.trend === "down" && (
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="flex items-end justify-between">
              <p className="text-3xl font-semibold text-gray-900">
                {metric.value}
              </p>
              <div className="p-2 rounded-lg bg-gray-50">{metric.icon}</div>
            </div>

            <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-indigo-500"
                    : index === 1
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
                style={{ width: `${Math.min(100, (index + 1) * 33)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 bg-gray-50 text-right">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View detailed report →
        </button>
      </div>
    </div>
  );
};

export default SystemMetrics;
