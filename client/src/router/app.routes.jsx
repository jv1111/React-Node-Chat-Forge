import AppLayout from "../layouts/AppLayout";

import Dashboard from "../pages/app/Dashboard";

export const appRoutes = {
  element: <AppLayout />,
  children: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ],
};
