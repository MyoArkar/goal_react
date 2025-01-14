import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";
import Sidebar from "./SideBar";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

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
    <div id="defaultLayout">
      <div className="content">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10 shadow-lg">
        <div>Header</div>
        <div className="flex items-center gap-4">
          <span>{user.name}</span>
          <a
            href="#"
            onClick={onLogout}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            Logout
          </a>
        </div>
      </header>
        
        <main className="flex flex-row mt-[56px] justify-between relative">
          <div className="fixed"><Sidebar/></div>
          <div className="ml-[256px]"><Outlet/></div>
        </main>
      </div>
    </div>
  );
}