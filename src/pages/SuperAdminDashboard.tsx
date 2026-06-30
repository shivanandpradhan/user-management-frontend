import { Outlet } from "react-router-dom";

const SuperAdminDashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-200 flex flex-col items-center py-12 px-4 relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-200 rounded-full opacity-20 blur-2xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-100 rounded-full opacity-30 blur-2xl pointer-events-none -z-10"></div>

        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-indigo-600 rounded-full p-4 shadow-lg z-10">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          {/* Subtle background SVG */}
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg width="140" height="140" fill="none">
              <circle cx="70" cy="70" r="70" fill="#6366F1" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-indigo-700 mt-10 mb-2 text-center tracking-tight drop-shadow">
            Super Admin Dashboard
          </h1>
          <div className="w-20 h-1 bg-indigo-300 rounded mb-6"></div>
          <p className="text-gray-500 text-center mb-8 text-lg">
            Welcome, Super Admin! Manage admins, system settings, and more
            below.
          </p>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboard;
