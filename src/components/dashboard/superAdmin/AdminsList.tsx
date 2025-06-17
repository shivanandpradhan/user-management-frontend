import { useState } from "react";
import { useApiQuery, useApiMutation } from "../../../hooks/useApi";
import {
  getAdmins,
  promoteToAdmin,
  demoteFromAdmin,
} from "../../../api/superAdmin";
import type { PaginatedResponse, UserProfileDto } from "../../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const AdminsList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useApiQuery<
    PaginatedResponse<UserProfileDto>
  >(["super-admin", "admins", page, search], () =>
    getAdmins({ page, limit: 10, search })
  );

  const actingUserId = useSelector((state: RootState) => state.auth.user?.id);

  // Setup the mutation to accept the target user ID
  const promoteMutation = useApiMutation(
    (targetUserId: string) => promoteToAdmin(targetUserId, actingUserId!),
    {},
    [["super-admin", "admins"]]
  );

  const demoteMutation = useApiMutation(
    (targetUserId: string) => demoteFromAdmin(targetUserId, actingUserId!),
    {},
    [["super-admin", "admins"]]
  );

  const handlePromote = (userId: string) => {
    promoteMutation.mutate(userId, {
      onSuccess: () => refetch(),
    });
  };

  const handleDemote = (userId: string) => {
    demoteMutation.mutate(userId, {
      onSuccess: () => refetch(),
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admins</h1>
        <div className="w-64">
          <input
            type="text"
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data?.items.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {user.username}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.roles?.includes("ROLE_SUPER_ADMIN")
                    ? "Super Admin"
                    : "Admin"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {!user.roles?.includes("ROLE_SUPER_ADMIN") && (
                    <>
                      <button
                        onClick={() => handlePromote(user.id as string)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Promote to Super Admin
                      </button>
                      <button
                        onClick={() => handleDemote(user.id as string)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Demote to User
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * 10 + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(page * 10, data?.data?.total || 0)}
            </span>{" "}
            of <span className="font-medium">{data?.data?.total}</span> admins
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * 10 >= (data?.data?.total || 0)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminsList;
