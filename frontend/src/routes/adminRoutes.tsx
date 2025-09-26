import { RouteObject } from "react-router-dom";
import { RoleEnum } from "@/common/types";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "@/components/layouts/AdminLayout";
import VehicleApproval from "@/pages/admin/vehicle-approval/VehicleApproval";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole={[RoleEnum.ADMIN]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "vehicle-approvals",
        element: <VehicleApproval />,
      },
    ],
  },
];

export default adminRoutes;
