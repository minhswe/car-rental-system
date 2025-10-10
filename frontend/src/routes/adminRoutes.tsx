import { RouteObject } from "react-router-dom";
import { RoleEnum } from "@/common/types";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "@/components/layouts/AdminLayout";
import VehicleApproval from "@/pages/admin/vehicle-approval/VehicleApproval";
import UserDashboard from "@/pages/admin/user-dashboard/UserDashboard";

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
      {
        path: "users",
        element: <UserDashboard />,
      },
    ],
  },
];

export default adminRoutes;
