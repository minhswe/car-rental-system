import { RouteObject } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import SignUpPage from "../pages/auth/sign-up/SignUp";

const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [{ path: "sign-up", element: <SignUpPage /> }],
  },
];

export default authRoutes;
