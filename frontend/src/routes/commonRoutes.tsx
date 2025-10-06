import type { RouteObject } from "react-router-dom";
import CommonLayout from "@/components/layouts/CommonLayout";
import HomePage from "@/pages/common/HomePage";
import AboutPage from "@/pages/common/AboutPage";
import VehicleListingPage from "@/pages/common/vehicle-listing/VehicleListingPage";
import VehicleDetail from "@/pages/common/vehicle-listing/list/VehicleDetail";

const commonRoutes: RouteObject[] = [
  {
    element: <CommonLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/vehicles", element: <VehicleListingPage /> },
      { path: "/vehicles/:id", element: <VehicleDetail /> },
    ],
  },
];

export default commonRoutes;
