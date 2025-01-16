import React from "react";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";

const Sidebar = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post("/auth/logout").then((response) => {
      if (response.status === 200) {
        localStorage.clear();
        setUser(null);
        setToken(null);
        console.log("Logout successful");
      }
    });
  };

  return (
    <div className="h-screen w-64 bg-gray-800 flex flex-col shadow-lg border-r-2 border-gray-600">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-100">My App</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 text-xl font-medium  rounded-lg transition-border ${isActive
                  ? "bg-gray-700 border-2 border-b-4 border-gray-600 text-yellow-500"
                  : "hover:bg-gray-700 text-gray-100 border-2 border-b-4 border-transparent"
                }`
              }
            >
              <span className="text-lg">📊</span>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>

            <NavLink
              to="/goal"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 text-xl font-medium  rounded-lg transition-border ${isActive
                  ? "bg-gray-700 border-2 border-b-4 border-gray-600 text-yellow-500"
                  : "hover:bg-gray-700 text-gray-100 border-2 border-b-4 border-transparent"
                }`
              }

            >
              <span className="text-lg">🎯</span>
              <span>Goal</span>
            </NavLink>
          </li>
          <li>
                <NavLink
              to="/milestones"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 text-xl font-medium rounded-lg transition-border ${isActive
                  ? "bg-gray-700 border-2 border-b-4 border-gray-600 text-yellow-500"
                  : "hover:bg-gray-700  text-gray-100"
                }`
              }

            >
              <span className="text-lg">🏆</span>
              <span>Milestones</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 text-xl font-medium rounded-lg transition-border ${isActive
                  ? "bg-gray-700 border-2 border-b-4 border-gray-600 text-yellow-500"
                  : "hover:bg-gray-700  text-gray-100"
                }`
              }
            >
              <span className="text-lg">✅</span>
              <span>Tasks</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <a
        href="#"
        onClick={onLogout}

        className="text-red-500 hover:text-red-700 transition-colors p-4"
 main
      >
        Logout
      </a>
    </div>
  );
};

export default Sidebar;
