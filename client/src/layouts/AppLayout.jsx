import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="bg-forge min-h-screen">
      <Outlet />
    </main>
  );
};

export default AppLayout;
