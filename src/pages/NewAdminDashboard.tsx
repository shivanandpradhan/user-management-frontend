import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

const NewAdminDashboard = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
          <div className="p-6 flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.5V6a2 2 0 012-2h14a2 2 0 012 2v7.5M16 21v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800">Admin Portal</h1>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              User Management
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Analytics
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>
          </nav>
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button className="md:hidden text-gray-500">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                Dashboard Overview
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 text-sm font-medium">A</span>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl shadow-sm p-6 text-white mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    Welcome back, Admin
                  </h1>
                  <p className="text-indigo-100">
                    Here's what's happening with your platform today
                  </p>
                </div>
                <div className="hidden md:block">
                  <svg
                    className="w-16 h-16 opacity-20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M3 13.5V6a2 2 0 012-2h14a2 2 0 012 2v7.5M16 21v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                {
                  title: "Total Users",
                  value: "1,248",
                  change: "+12%",
                  icon: "users",
                },
                {
                  title: "Active Sessions",
                  value: "84",
                  change: "+5%",
                  icon: "activity",
                },
                {
                  title: "New Signups",
                  value: "32",
                  change: "+8%",
                  icon: "user-add",
                },
                {
                  title: "Pending Actions",
                  value: "5",
                  change: "-2",
                  icon: "clock",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        {stat.value}
                      </p>
                      <p
                        className={`text-sm mt-1 ${
                          stat.change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {stat.change} from yesterday
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {stat.icon === "users" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        )}
                        {stat.icon === "activity" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        )}
                        {stat.icon === "user-add" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          />
                        )}
                        {stat.icon === "clock" && (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NewAdminDashboard;
