import { Link } from "react-router-dom";

interface SidebarProps {
  roles: string[];
}

const Sidebar = ({ roles }: SidebarProps) => {
  const userLinks = [
    { name: "Profile", href: "/dashboard/profile" },
    { name: "Security", href: "/dashboard/security" },
  ];

  const adminLinks = [
    { name: "Users", href: "/admin/users" },
    { name: "Admin Tools", href: "/admin/tools" },
  ];

  const superAdminLinks = [
    { name: "Admins", href: "/super-admin/admins" },
    { name: "System Settings", href: "/super-admin/settings" },
  ];

  const links = [
    ...userLinks,
    ...(roles.includes("ROLE_ADMIN") ? adminLinks : []),
    ...(roles.includes("ROLE_SUPER_ADMIN") ? superAdminLinks : []),
  ];

  return (
    <div className="w-64 bg-white shadow-sm">
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">Navigation</h2>
        <nav className="mt-4">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
