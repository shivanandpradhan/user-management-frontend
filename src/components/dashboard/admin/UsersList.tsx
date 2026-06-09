import { useState } from "react";
import { useApiMutation, useApiQuery } from "../../../hooks/useApi";
import { disableUser, enableUser, getUsers } from "../../../api/admin";
import type { PaginatedResponse, UserProfileDto } from "../../../types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const actingUserId = useSelector((state: RootState) => state.auth.user?.id);

  const { data, isLoading, refetch } = useApiQuery<
    PaginatedResponse<UserProfileDto>
  >(["admin", "users", page.toString(), search], () =>
    getUsers({ page, limit: 10, search })
  );

  const { mutate, isPending } = useApiMutation(
    ({
      userId,
      actingUserId,
      action,
    }: {
      userId: string;
      actingUserId: string;
      action: "enable" | "disable";
    }) =>
      action === "enable"
        ? enableUser(userId, actingUserId)
        : disableUser(userId, actingUserId),
    {
      onSuccess: () => {
        refetch();
      },
    },
    [["admin", "users"]]
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-indigo-600 font-semibold animate-pulse">
          Loading...
        </span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-6 px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 tracking-tight">
          Users
        </h1>
        <div className="w-full sm:w-72 relative">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-xl bg-white/80 border border-indigo-200 py-2 pl-10 pr-4 shadow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition placeholder:text-gray-400"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-2-2"
            />
          </svg>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-indigo-100 overflow-x-auto w-full">
        <table className="min-w-full text-sm">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Username
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.items.map((user, idx) => (
              <tr
                key={user.id}
                className={idx % 2 === 0 ? "bg-white/70" : "bg-indigo-50/60"}
              >
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                  {user.username}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500">
                  {user.email}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  {user.enabled ? (
                    <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-green-100 text-green-700 shadow">
                      Active
                    </span>
                  ) : (
                    <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-red-100 text-red-600 shadow">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap font-medium flex gap-2">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="px-3 py-1 rounded-lg border border-indigo-300 bg-white text-indigo-700 hover:bg-indigo-50 hover:border-indigo-500 transition font-semibold shadow-sm"
                  >
                    View
                  </Link>
                  {/* <button className="px-3 py-1 rounded-lg border border-red-300 bg-white text-red-600 hover:bg-red-50 hover:border-red-500 transition font-semibold shadow-sm">
                    {user.enabled ? "Disable" : "Enable"}
                  </button> */}
                  <button
                    className={`px-3 py-1 rounded-lg border ${
                      user.enabled
                        ? "border-red-300 bg-white text-red-600 hover:bg-red-50 hover:border-red-500"
                        : "border-green-300 bg-white text-green-600 hover:bg-green-50 hover:border-green-500"
                    } transition font-semibold shadow-sm`}
                    disabled={isPending || !actingUserId}
                    onClick={() => {
                      mutate({
                        userId: user.id!,
                        actingUserId: actingUserId!,
                        action: user.enabled ? "disable" : "enable",
                      });
                    }}
                  >
                    {user.enabled ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-gray-700">
          Showing <span className="font-bold">{(page - 1) * 10 + 1}</span> to{" "}
          <span className="font-bold">
            {Math.min(page * 10, data?.data?.total || 0)}
          </span>{" "}
          of <span className="font-bold">{data?.data?.total}</span> users
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 disabled:opacity-50 transition"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * 10 >= (data?.data?.total || 0)}
            className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold hover:bg-indigo-200 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
