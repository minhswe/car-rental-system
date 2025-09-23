import { RouteObject } from "react-router-dom";
import { RoleEnum } from "@/common/types";
import ProtectedRoute from "./components/ProtectedRoute";
import ProviderLayout from "@/components/layouts/ProviderLayout";
import CarManagement from "@/pages/provider/CarManagement";
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
        path: "my-cars",
        element: <CarManagement />,
      },
    ],
  },
];

export default providerRoutes;
