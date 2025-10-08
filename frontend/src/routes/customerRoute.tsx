import { RouteObject } from "react-router-dom";
import { RoleEnum } from "@/common/types";
import ProtectedRoute from "./components/ProtectedRoute";
import CommonLayout from "@/components/layouts/CommonLayout";
import HistoryPage from "@/pages/customer/history/HistoryPage";

const customerRoutes: RouteObject[] = [
  {
    path: "/customer",
    element: (
      <ProtectedRoute requiredRole={[RoleEnum.CUSTOMER, RoleEnum.ADMIN]}>
        <CommonLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "history",
        element: <HistoryPage />,
      },
    ],
  },
];

export default customerRoutes;
