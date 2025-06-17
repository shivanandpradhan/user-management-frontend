import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

const SuperAdminDashboard = () => {
  return (
    <ProtectedRoute roles={["ROLE_SUPER_ADMIN"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default SuperAdminDashboard;
