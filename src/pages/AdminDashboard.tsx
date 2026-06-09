import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AdminDashboard = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-200 flex flex-col items-center py-12 px-4 relative overflow-hidden">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-2xl p-10 flex flex-col items-center relative">
          {/* Floating Icon */}
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
                d="M3 13.5V6a2 2 0 012-2h14a2 2 0 012 2v7.5M16 21v-4a2 2 0 00-2-2h-4a2 2 0 00-2 2v4"
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
            Admin Dashboard
          </h1>
          <div className="w-20 h-1 bg-indigo-300 rounded mb-6"></div>
          <p className="text-gray-500 text-center mb-8 text-lg">
            Welcome, Admin! Manage users, view analytics, and configure settings
            below.
          </p>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
