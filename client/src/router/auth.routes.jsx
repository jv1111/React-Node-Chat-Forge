import GuestRoute from "./guards/GuestRoute";
import AuthLayout from "../layouts/AuthLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const authRoutes = {
  element: <GuestRoute />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ],
};
