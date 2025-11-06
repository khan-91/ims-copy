import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTable, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, isParent: true },
    { name: "Inventories", path: "/admin-dashboard/inventories", icon: <FaTable />, isParent: false },
    { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers />, isParent: false },
    { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent: false },
    { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt />, isParent: false},
  ];

  return (
    <div className="flex flex-col h-screen bg-black text-white w-16 md:w-64 fixed">
      {/* Logo / Brand */}
      <div className="h-16 flex items-center justify-center border-b border-gray-700">
        <span className="hidden md:block text-xl font-bold">Inventory MS</span>
        <span className="md:hidden text-xl font-bold">IMS</span>
      </div>

      {/* Menu Items */}
      <ul className="mt-4 flex flex-col space-y-1 p-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
            end={item.isParent}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition duration-200 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="hidden md:block">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
