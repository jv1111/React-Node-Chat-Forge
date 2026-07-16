import { Outlet } from "react-router-dom";
import Sidebar from "../components/navigation/Sidebar.jsx";

const AppLayout = () => {
  return (
    <main className="bg-forge flex min-h-screen">
      <Sidebar />

      <section className="flex-1 p-8">
        <Outlet />
      </section>
    </main>
  );
};

export default AppLayout;
