import ProtectedRoute from "./guards/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

import Dashboard from "../pages/app/Dashboard";
import GetStarted from "../pages/app/GetStarted";
import ManageProjects from "../pages/app/ManageProjects";
import Playground from "../pages/app/Playground";

export const appRoutes = {
  element: <ProtectedRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        {
          path: "/dashboard",
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "get-started",
              element: <GetStarted />,
            },
          ],
        },
        {
          path: "/manage-projects",
          element: <ManageProjects />,
        },
        {
          path: "/playground",
          element: <Playground />,
        },
      ],
    },
  ],
};
