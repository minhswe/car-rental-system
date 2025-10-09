import { RouteObject } from "react-router-dom";
import { RoleEnum } from "@/common/types";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderLayout from "@/components/layouts/ProviderLayout";
import VehicleManagment from "@/pages/provider/vehicle/VehicleManagment";
import RentalStatus from "@/pages/provider/rental-status/RentalStatus";
import Revenue from "@/pages/provider/revenue/Revenue";

const providerRoutes: RouteObject[] = [
  {
    path: "/provider",
    element: (
      <ProtectedRoute requiredRole={[RoleEnum.PROVIDER, RoleEnum.ADMIN]}>
        <ProviderLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "my-vehicles",
        element: <VehicleManagment />,
      },
      {
        path: "rental-status",
        element: <RentalStatus />,
      },
      {
        path: "my-revenue",
        element: <Revenue />,
      },
    ],
  },
];

export default providerRoutes;
