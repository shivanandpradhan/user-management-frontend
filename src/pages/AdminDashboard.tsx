import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AdminDashboard = () => {
  return (
    // <ProtectedRoute roles={["ROLE_ADMIN", "ROLE_SUPER_ADMIN"]}>
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
