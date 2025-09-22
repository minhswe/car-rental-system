import type { RouteObject } from "react-router-dom";
import CommonLayout from "@/components/layouts/CommonLayout";
import HomePage from "@/pages/common/HomePage";
import AboutPage from "@/pages/common/AboutPage";

const commonRoutes: RouteObject[] = [
  {
    element: <CommonLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
];

export default commonRoutes;
