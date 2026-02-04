import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, CalendarCheck } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Employees", path: "/employees", icon: Users },
    { name: "Attendance", path: "/attendance", icon: CalendarCheck },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-gray-900">
            HRMS <span className="text-indigo-600">Lite</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                            ${
                              isActive
                                ? "bg-indigo-50 text-indigo-600 font-semibold"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            }
                        `}
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
