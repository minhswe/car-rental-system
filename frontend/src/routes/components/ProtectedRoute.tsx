import { Navigate } from "react-router-dom";
import { RoleEnum } from "@/common/types";
import { jwtDecode } from "jwt-decode";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole: RoleEnum[];
}

const isTokenExpired = (token?: string | null) => {
  if (!token) return true;
  try {
    const decoded: any = jwtDecode(token);
    if (!decoded.exp) return true;
    const now = Date.now() / 1000; // in seconds
    return decoded.exp < now;
  } catch (error) {
    return true;
  }
};

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const user: any = JSON.parse(localStorage.getItem("user") || "null");
  const accessToken = localStorage.getItem("accessToken");

  if (
    !user ||
    !accessToken ||
    isTokenExpired(accessToken) ||
    !requiredRole.includes(user.role)
  ) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
