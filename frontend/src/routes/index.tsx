import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from "@/pages/common/NotFoundPage";

import commonRoutes from "./commonRoutes";
import authRoutes from "./authRoutes";
import { RoleEnum } from "@/common/types";

const getRedicrectPath = (user: { role: RoleEnum } | null) => {
  if (!user) return "/";
  switch (user.role) {
    case RoleEnum.ADMIN:
      return "/admin/dashboard";
    case RoleEnum.PROVIDER:
      return "/provider/dashboard";
    case RoleEnum.CUSTOMER:
      return "/customer";
    default:
      return "/signin";
  }
};

const routes: RouteObject[] = [
  ...commonRoutes,
  {
    path: "/",
    element: JSON.parse(localStorage.getItem("user") || "null") && (
      <Navigate
        to={getRedicrectPath(
          JSON.parse(localStorage.getItem("user") || "null")
        )}
      />
    ),
  },
  ...authRoutes,
  { path: "*", element: <NotFoundPage /> },
];

const Routes = createBrowserRouter(routes);

export const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={Routes} />
    </>
  );
};
