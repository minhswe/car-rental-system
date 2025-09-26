import { RouteObject } from "react-router-dom";
import { RoleEnum } from "@/common/types";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderLayout from "@/components/layouts/ProviderLayout";
import VehicleManagment from "@/pages/provider/VehicleManagment";
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
    ],
  },
];

export default providerRoutes;
