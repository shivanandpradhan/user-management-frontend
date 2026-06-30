import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import Layout from "./components/common/Layout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AuthGuard from "./components/common/AuthGuard";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Profile from "./components/dashboard/user/Profile";
import UsersList from "./components/dashboard/admin/UsersList";
import AdminsList from "./components/dashboard/superAdmin/AdminsList";
import SignupPage from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPassword";
import Security from "./components/dashboard/superAdmin/Security";
import Home from "./pages/Home";
import UserDetails from "./components/dashboard/superAdmin/UserDetails";
import SystemMetrics from "./components/dashboard/superAdmin/SystemMetrics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/user-management-frontend">
          <Layout>
            <Routes>
              {/* Public Routes - Accessible to everyone */}
              <Route path="/" element={<Home />} />
              
              {/* Auth Routes - Redirect to dashboard if already logged in */}
              <Route 
                path="login" 
                element={
                  <AuthGuard redirectTo="/dashboard">
                    <Login />
                  </AuthGuard>
                } 
              />
              <Route 
                path="signup" 
                element={
                  <AuthGuard redirectTo="/dashboard">
                    <SignupPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="forgot-password" 
                element={
                  <AuthGuard redirectTo="/dashboard">
                    <ForgotPasswordPage />
                  </AuthGuard>
                } 
              />
              <Route 
                path="reset-password/:token" 
                element={<ResetPasswordPage />} 
              />

              {/* Protected Routes - Require authentication */}
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="profile" element={<Profile />} />
                <Route path="security" element={<Security />} />
              </Route>

              {/* Admin Routes - Require ROLE_ADMIN */}
              <Route 
                path="admin" 
                element={
                  <ProtectedRoute requiredRoles={["ROLE_ADMIN"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="users" element={<UsersList />} />
                <Route path="users/:userId" element={<UserDetails />} />
              </Route>

              {/* Super Admin Routes - Require ROLE_SUPER_ADMIN */}
              <Route 
                path="super-admin" 
                element={
                  <ProtectedRoute requiredRoles={["ROLE_SUPER_ADMIN"]}>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="admins" element={<AdminsList />} />
                <Route path="settings" element={<SystemMetrics />} />
              </Route>

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;