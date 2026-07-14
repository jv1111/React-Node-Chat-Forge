import Logo from "./Logo";

const AuthPanel = ({ title, description, endpoint, children, features }) => {
  return (
    <aside className="auth-panel">
      <div>
        <Logo />

        <h1 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-white">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-white/50">
          {description}
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/40 shadow-inner shadow-black/40">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />

          <span className="ml-2 text-[11px] text-white/30">{endpoint}</span>
        </div>

        {children}
      </div>

      <ul className="auth-feature-list">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            ✓ {feature}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AuthPanel;
