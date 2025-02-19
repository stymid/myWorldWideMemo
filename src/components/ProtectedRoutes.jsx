import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return <Navigate to={"/login"} state={{ from: location }} />;
  return <Outlet />;
};

export default ProtectedRoutes;
