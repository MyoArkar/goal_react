import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";
import Sidebar from "./SideBar";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }







  return (

    <main className="flex flex-row justify-between relative">
      <div className="fixed"><Sidebar /></div>
      <div className="w-full min-h-screen ml-[256px]"><Outlet /></div>
    </main>


  );
}