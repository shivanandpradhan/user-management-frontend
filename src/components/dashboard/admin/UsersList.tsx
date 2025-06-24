import { useState } from "react";
import { useApiQuery } from "../../../hooks/useApi";
import { getUsers } from "../../../api/admin";
import type { PaginatedResponse, UserProfileDto } from "../../../types";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useApiQuery<PaginatedResponse<UserProfileDto>>(
    ["admin", "users", page.toString(), search],
    () => getUsers({ page, limit: 10, search })
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
                  <button className="px-3 py-1 rounded-lg border border-red-300 bg-white text-red-600 hover:bg-red-50 hover:border-red-500 transition font-semibold shadow-sm">
                    Disable
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

// import { useState } from "react";
// import { useApiQuery } from "../../../hooks/useApi";
// import { getUsers } from "../../../api/admin";
// import type { PaginatedResponse, UserProfileDto } from "../../../types";
// import { Link } from "react-router-dom";

// const UsersList = () => {
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState("");

//   const { data, isLoading } = useApiQuery<PaginatedResponse<UserProfileDto>>(
//     ["admin", "users", page, search],
//     () => getUsers({ page, limit: 10, search })
//   );

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-[300px]">
//         <div className="flex flex-col items-center gap-3">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
//           <span className="text-gray-600 font-medium">Loading users...</span>
//         </div>
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
//       {/* Header Section */}
//       <div className="sm:flex sm:items-center sm:justify-between mb-8">
//         <div className="mb-4 sm:mb-0">
//           <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage all registered users and their permissions
//           </p>
//         </div>
//         <div className="relative w-full sm:w-80">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <svg
//               className="h-5 w-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400"
//           />
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-200">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   User
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Email
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Status
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Last Active
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data?.data?.items.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-50 transition">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                         <span className="text-indigo-600 font-medium">
//                           {user.username.charAt(0).toUpperCase()}
//                         </span>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {user.username}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {user.roles?.join(", ")}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{user.email}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {user.enabled ? (
//                       <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
//                         Active
//                       </span>
//                     ) : (
//                       <span className="px-2.5 py-0.5 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800">
//                         Inactive
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {user.lastLogin
//                       ? new Date(user.lastLogin).toLocaleDateString()
//                       : "Never"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <Link
//                         to={`/admin/users/${user.id}`}
//                         className="text-indigo-600 hover:text-indigo-900 transition"
//                       >
//                         <svg
//                           className="h-5 w-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                           />
//                         </svg>
//                       </Link>
//                       <button className="text-gray-400 hover:text-gray-600 transition">
//                         <svg
//                           className="h-5 w-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
//           <div className="flex-1 flex justify-between items-center sm:hidden">
//             <button
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//               className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-700">
//               Page {page} of {Math.ceil((data?.data?.total || 0) / 10)}
//             </span>
//             <button
//               onClick={() => setPage((p) => p + 1)}
//               disabled={page * 10 >= (data?.data?.total || 0)}
//               className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Showing{" "}
//                 <span className="font-medium">{(page - 1) * 10 + 1}</span> to{" "}
//                 <span className="font-medium">
//                   {Math.min(page * 10, data?.data?.total || 0)}
//                 </span>{" "}
//                 of <span className="font-medium">{data?.data?.total}</span>{" "}
//                 users
//               </p>
//             </div>
//             <div>
//               <nav
//                 className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
//                 aria-label="Pagination"
//               >
//                 <button
//                   onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   disabled={page === 1}
//                   className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                 >
//                   <span className="sr-only">Previous</span>
//                   <svg
//                     className="h-5 w-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//                 {Array.from({
//                   length: Math.ceil((data?.data?.total || 0) / 10),
//                 })
//                   .slice(0, 5)
//                   .map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setPage(i + 1)}
//                       className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                         page === i + 1
//                           ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
//                           : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 <button
//                   onClick={() => setPage((p) => p + 1)}
//                   disabled={page * 10 >= (data?.data?.total || 0)}
//                   className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
//                 >
//                   <span className="sr-only">Next</span>
//                   <svg
//                     className="h-5 w-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//               </nav>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UsersList;
