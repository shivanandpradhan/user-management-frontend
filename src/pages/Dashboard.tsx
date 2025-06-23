import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 mb-10 flex flex-col items-center relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 rounded-full p-3 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
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
          <h1 className="text-4xl font-extrabold text-indigo-700 mt-6 mb-2 text-center tracking-tight drop-shadow">
            Dashboard
          </h1>
          <div className="w-20 h-1 bg-indigo-300 rounded mb-4"></div>
          <p className="text-gray-600 text-center mb-2 text-lg">
            Welcome to your dashboard. Manage your account and settings below.
          </p>
        </div>
        <div className="w-full max-w-3xl">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
