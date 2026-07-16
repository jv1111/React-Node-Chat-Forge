import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-xl px-4 py-3 text-sm font-medium transition ${
          isActive
            ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
            : "text-white/60 hover:bg-white/5 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default SidebarItem;