import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <Outlet />
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
