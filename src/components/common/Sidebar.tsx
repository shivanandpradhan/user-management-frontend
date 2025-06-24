import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  roles: string[];
}

const Sidebar = ({ roles }: SidebarProps) => {
  const location = useLocation();

  const userLinks = [
    { name: "Profile", href: "/dashboard/profile", icon: "👤" },
    { name: "Security", href: "/dashboard/security", icon: "🔒" },
  ];

  const adminLinks = [
    { name: "User Management", href: "/admin/users", icon: "👥" },
    { name: "Admin Console", href: "/admin/tools", icon: "⚙️" },
  ];

  const superAdminLinks = [
    { name: "Admin Management", href: "/super-admin/admins", icon: "👑" },
    { name: "System Configuration", href: "/super-admin/settings", icon: "🖥️" },
  ];

  const links = [
    ...userLinks,
    ...(roles.includes("ROLE_ADMIN") ? adminLinks : []),
    ...(roles.includes("ROLE_SUPER_ADMIN") ? superAdminLinks : []),
  ];

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-white to-indigo-50/50 backdrop-blur-lg border-r border-gray-200 flex flex-col transition-all duration-300 hover:shadow-lg">
      {/* Header */}
      <div className="p-6 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold text-indigo-700">U</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Navigation
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {roles.includes("ROLE_SUPER_ADMIN")
            ? "Super Admin"
            : roles.includes("ROLE_ADMIN")
            ? "Admin"
            : "User"}{" "}
          Access
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1.5">
          {links.map((link) => {
            const isActive = location.pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-indigo-100/80 text-indigo-700 shadow-inner border border-indigo-200/50"
                        : "text-gray-600 hover:bg-indigo-50/70 hover:text-indigo-600 hover:translate-x-1"
                    }
                  `}
                >
                  <span className={`text-xl ${isActive ? "scale-110" : ""}`}>
                    {link.icon}
                  </span>
                  <span className="flex-1">{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100/50 text-center">
        <div className="text-xs text-gray-400 mb-1">
          v2.4.1 • {new Date().getFullYear()}
        </div>
        <div className="text-xs font-medium text-indigo-600">
          User Management System
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
