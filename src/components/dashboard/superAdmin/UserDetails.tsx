import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../api/admin";
import { useApiQuery } from "../../../hooks/useApi";
import AdminTools from "../admin/AdminTools";
import type { RootState } from "../../../store/store";
import { useCallback } from "react";

const UserDetails = () => {
  const { userId } = useParams();
  const actingUserId = useSelector((state: RootState) => state.auth.user?.id);
  const { data, isLoading, refetch } = useApiQuery(
    ["user", userId as string],
    () => getUserDetails(userId!, actingUserId!),
    { enabled: !!userId && !!actingUserId }
  );

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-lg font-medium text-indigo-600">
          Loading user details...
        </span>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
        <svg
          className="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="text-xl font-semibold text-gray-800">
          User not found
        </span>
        <p className="text-gray-500">The requested user could not be loaded</p>
      </div>
    );

  const user = data.data;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* User Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center text-3xl font-bold text-indigo-700 shadow-md">
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </div>
          <div
            className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white ${
              user?.enabled ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-indigo-600 mt-1">{user?.email}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {user?.roles && user.roles?.length > 0 ? (
              user?.roles.map((role) => (
                <span
                  key={role.toString()}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-semibold shadow-sm"
                >
                  {role}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No roles assigned</span>
            )}
          </div>
        </div>
      </div>

      {/* User Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Account Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </h3>
            <p className="text-sm font-medium text-gray-900">{userId}</p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account Enabled
            </h3>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  user?.enabled
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user?.enabled ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account Lock
            </h3>
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  user?.accountLocked
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user?.accountLocked ? "Locked" : "UnLocked"}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </h3>
            <p className="text-sm font-medium text-gray-900">
              {user?.createdAt
                ? new Date(user?.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Login
            </h3>
            <p className="text-sm font-medium text-gray-900">
              {user?.lastLogin
                ? new Date(user?.lastLogin).toLocaleString()
                : "Never logged in"}
            </p>
          </div>
        </div>
      </div>

      {/* Admin Tools Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Administration
        </h2>
        <AdminTools userId={userId || ""} onComplete={handleRefetch} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-indigo-50 opacity-20 blur-xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-indigo-50 opacity-20 blur-xl"></div>
      </div>
    </div>
  );
};

export default UserDetails;
