import { useApiQuery } from "../../../hooks/useApi";
import { getUserSecurity } from "../../../api/users";
import MfaSetup from "../mfa/MfaSetup";
import { formatDate } from "../../../utils/helpers";
import Error from "../../common/Error";
import { useCallback, useState } from "react";
import ChangePasswordModal from "../../models/ChangePasswordModal";

const Security = () => {
  const { data, isLoading, error, refetch } = useApiQuery(
    ["user-security"],
    getUserSecurity
  );

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  // State to control the change password modal
  const [showChangePassword, setShowChangePassword] = useState(false);

  if (isLoading)
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-indigo-100 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-indigo-500 animate-pulse"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                  opacity="0.4"
                />
                <path d="M12 6a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V7a1 1 0 0 0-1-1z" />
              </svg>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500">
            Loading security settings...
          </p>
        </div>
      </div>
    );

  if (error) return <Error message={error.message} />;

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Account Security</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your authentication methods and active sessions
          </p>
        </div>

        {/* Login Security Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg width="120" height="120" fill="none">
              <circle cx="60" cy="60" r="60" fill="#6366F1" />
            </svg>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full shadow">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-indigo-700 tracking-tight">
              Login Security
            </h2>
          </div>
          <div className="space-y-8">
            {/* MFA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b  border-gray-100 pb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-700">
                  Multi-Factor Authentication
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1
                  ${
                    data?.data?.mfaEnabled
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {data?.data?.mfaEnabled ? "Enabled" : "Disabled"}
                </span>
              </div>
              <MfaSetup onComplete={handleRefetch} data={data?.data} />
            </div>

            {/* Password Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
              <div className="space-y-1">
                <h3 className="font-medium text-gray-800">Password</h3>
                <p className="text-sm text-gray-500">
                  Last changed{" "}
                  {data?.data?.lastPasswordResetDate
                    ? formatDate(data.data.lastPasswordResetDate)
                    : "never"}
                </p>
              </div>
              {/* <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition">
                Change Password
              </button> */}
              <button
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </button>
            </div>

            {/* Login Activity */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-medium text-gray-800 mb-4">Login Activity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Failed attempts</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {data?.data?.failedLoginAttempts || 0}
                  </p>
                </div>
                {data?.data?.accountLockedUntil && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-500">Account locked until</p>
                    <p className="text-lg font-medium text-red-700">
                      {formatDate(data.data.accountLockedUntil)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Active Sessions Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg width="120" height="120" fill="none">
              <circle cx="60" cy="60" r="60" fill="#6366F1" />
            </svg>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full shadow">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-indigo-700 tracking-tight">
              Active Sessions
            </h2>
          </div>
          {data?.data?.activeSessions?.length ? (
            <div className="space-y-4">
              {data.data.activeSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-indigo-100 rounded-xl bg-indigo-50/40 shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="text-base font-semibold text-gray-700">
                      {session.device || "Unknown Device"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.ipAddress} • Last active:{" "}
                      {formatDate(session.lastAccessed)}
                    </p>
                  </div>
                  <button
                    className="mt-2 md:mt-0 px-4 py-1 rounded-full bg-red-50 text-red-600 font-semibold text-sm hover:bg-red-100 transition"
                    onClick={() => revokeSession(session.id)}
                  >
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No active sessions
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Your account isn't currently accessed from any devices.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePasswordModal
          open={showChangePassword}
          onClose={() => setShowChangePassword(false)}
          onSuccess={() => {
            setShowChangePassword(false);
            handleRefetch();
          }}
        />
      )}
    </>
  );

  async function revokeSession(sessionId: string) {
    // Implementation for revoking sessions
    console.log("Revoking session:", sessionId);
    // await revokeSessionApi(sessionId);
    // handleRefetch();
  }
};

export default Security;
