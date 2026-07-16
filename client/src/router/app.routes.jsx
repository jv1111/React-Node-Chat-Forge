import ProtectedRoute from "./guards/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import Dashboard from "../pages/app/Dashboard";

export const appRoutes = {
  element: <ProtectedRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ],
};
