import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="bg-forge flex min-h-screen items-center justify-center p-6">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
