import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/store";
import Layout from "./components/common/Layout";
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

// todo - disabling retry mechanism for development purpose. will remove later.
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false, // Disable retry globally
//     },
//     mutations: {
//       retry: false, // (Optional) Disable retry for mutations as well
//     },
//   },
// });

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/user-management-frontend">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="reset-password/:token"
                element={<ResetPasswordPage />}
              />

              <Route path="dashboard" element={<Dashboard />}>
                <Route path="profile" element={<Profile />} />
                <Route path="security" element={<Security />} />
              </Route>

              <Route path="admin" element={<AdminDashboard />}>
                <Route path="users" element={<UsersList />} />
                <Route path="users/:userId" element={<UserDetails />} />
              </Route>

              <Route path="super-admin" element={<SuperAdminDashboard />}>
                <Route path="admins" element={<AdminsList />} />
                <Route path="settings" element={<SystemMetrics />} />
              </Route>

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
