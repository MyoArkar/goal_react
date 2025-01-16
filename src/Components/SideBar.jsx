import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";

const Sidebar = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const onLogout = (ev) => {
    ev.preventDefault()

    axiosClient.get("/auth/logout").then((response) => {
      if (response.status === 200) {
        localStorage.clear();
        setUser(null)
        setToken(null)
        console.log("Logout successful");
      }
    })


  }
  return (
    <div className="h-screen w-64 bg-gray-800 text-gray-200 flex flex-col shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">My App</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg">📊</span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/goal"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg">🎯</span>
              <span>Goals</span>
            </Link>
          </li>
          <li>
            <Link
              to="/milestone"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg">🏆</span>
              <span>Milestones</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <span className="text-lg">✅</span>
              <span>Tasks</span>
            </Link>
          </li>
        </ul>
      </nav>
      <a
        href="#"
        onClick={onLogout}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        Logout
      </a>
    </div>
  );
};

export default Sidebar;
