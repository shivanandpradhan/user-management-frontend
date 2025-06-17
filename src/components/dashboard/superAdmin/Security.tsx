import { useApiQuery } from "../../../hooks/useApi";
import { getUserSecurity } from "../../../api/users";
import MfaSetup from "../mfa/MfaSetup";
import { formatDate } from "../../../utils/helpers";
import Error from "../../common/Error";

const Security = () => {
  const { data, isLoading, error } = useApiQuery(
    ["user-security"],
    getUserSecurity
  );

  //   if (isLoading) return <Loading />;
  if (isLoading) return "Loading ...";
  if (error) return <Error message={error.message} />;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Login Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">
                Multi-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                {data?.data?.mfaEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            <MfaSetup />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Last Password Change</h3>
              <p className="text-sm text-gray-500">
                {data?.data?.lastPasswordResetDate
                  ? formatDate(data.data.lastPasswordResetDate)
                  : "Never"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Failed Login Attempts</h3>
              <p className="text-sm text-gray-500">
                {data?.data?.failedLoginAttempts || 0}
              </p>
            </div>
          </div>

          {data?.data?.accountLockedUntil && (
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Account Locked Until</h3>
                <p className="text-sm text-gray-500">
                  {formatDate(data.data.accountLockedUntil)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-medium mb-4">Active Sessions</h2>
        {data?.data?.activeSessions?.length ? (
          <div className="space-y-2">
            {data.data.activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div>
                  <p className="text-sm font-medium">
                    {session.device || "Unknown Device"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.ipAddress} • Last active:{" "}
                    {formatDate(session.lastAccessed)}
                  </p>
                </div>
                <button
                  className="text-sm text-red-600 hover:text-red-500"
                  onClick={() => revokeSession(session.id)}
                >
                  Revoke
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No active sessions found</p>
        )}
      </div>
    </div>
  );

  async function revokeSession(sessionId: string) {
    // Implementation for revoking sessions would go here
    console.log("Revoking session:", sessionId);
    // You would typically call an API endpoint like:
    // await revokeSessionApi(sessionId);
    // And then refetch the security data
  }
};

export default Security;
