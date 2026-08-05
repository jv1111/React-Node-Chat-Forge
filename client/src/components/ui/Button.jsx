import { Icon } from "@iconify/react";

const variants = {
  primary:
    "bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20 hover:brightness-105 hover:shadow-primary/30 active:brightness-95",

  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10 active:bg-white/15",
};

const Button = ({
  children,
  variant = "primary",
  loading = false,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={[
        "flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70",
        variants[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? (
        <>
          <Icon
            icon="svg-spinners:90-ring-with-bg"
            className="h-5 w-5 animate-spin"
          />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
