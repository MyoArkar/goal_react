import { useStateContext } from "../contexts/contextprovider";
import { Navigate } from "react-router-dom";

import Menu from "./Menu";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <main>
      <Menu />
    </main>
  );
}