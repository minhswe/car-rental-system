import { RouteObject } from "react-router-dom";
import AuthLayout from "@/components/layouts/AuthLayout";
import SignUpPage from "@/pages/auth/sign-up/SignUp";
import SignInPage from "@/pages/auth/sign-in/SignIn";
const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      { path: "sign-up", element: <SignUpPage /> },
      { path: "sign-in", element: <SignInPage /> },
    ],
  },
];

export default authRoutes;
