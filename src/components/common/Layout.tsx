import Navbar from "./Navbar";
import { useAuth } from "../../hooks/useAuth";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        {user && <Sidebar roles={user.roles} />}
        <main className="flex-1 p-4 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
