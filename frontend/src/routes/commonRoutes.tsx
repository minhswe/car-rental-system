
import type { RouteObject } from "react-router-dom";
import CommonLayout from "../components/layouts/CommonLayout";
import HomePage from "../pages/common/HomePage"

const commonRoutes : RouteObject[] = [
  {
    element: <CommonLayout />,
    children: [
      {path: "/", element: <HomePage />},
  ]
}];

export default commonRoutes;