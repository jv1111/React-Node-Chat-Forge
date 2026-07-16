import { Icon } from "@iconify/react";

const Button = ({
  children,
  loading = false,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`btn-primary ${className}`}
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
