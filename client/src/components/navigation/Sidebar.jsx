import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as logoutAction } from "../../features/auth/authSlice";
import * as authService from "../../services/auth.service";

import SidebarItem from "./SidebarItem";
import { sidebarLinks } from "./sidebarLinks";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      dispatch(logoutAction());
      navigate("/", { replace: true });
    }
  };

  return (
    <aside className="flex w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
      {/* header */}

      <nav className="flex flex-col gap-2 p-5">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-widest text-white/30">
          Navigation
        </p>

        {sidebarLinks.map((link) => (
          <SidebarItem key={link.to} {...link} />
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 p-5">
        <div className="rounded-xl bg-white/5 p-4">
          <p className="font-medium text-white">{user?.username}</p>

          <button
            onClick={handleLogout}
            className="mt-3 text-sm text-danger transition hover:opacity-80"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
