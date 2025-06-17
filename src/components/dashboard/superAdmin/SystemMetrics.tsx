import { getSystemMetrics } from "../../../api/system";
import { useApiQuery } from "../../../hooks/useApi";

const SystemMetrics = () => {
  const { data, isLoading } = useApiQuery(["system-metrics"], getSystemMetrics);

  if (isLoading) return <div>Loading metrics...</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-medium mb-4">System Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-semibold">
            {data?.data?.totalUsers || 0}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Active Sessions</h3>
          <p className="text-2xl font-semibold">
            {data?.data?.activeSessions || 0}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Storage Used</h3>
          <p className="text-2xl font-semibold">
            {data?.data?.storageUsed || 0} MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default SystemMetrics;
