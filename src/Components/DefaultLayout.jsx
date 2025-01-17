import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import Sidebar from "./SideBar";
import Menu from "./Menu";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();

   if (!token) {
     return <Navigate to="/login" />;
   }
   return (
    <main className="flex h-screen overflow-hidden">
      
      <aside className="fixed h-full w-64 bg-gray-800 shadow-lg">
        <Sidebar />
      </aside>
      
      <section className="ml-64 flex-1 overflow-y-auto">
        <Outlet />
      </section>

    </main>
  );
}