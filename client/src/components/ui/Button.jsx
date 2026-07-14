import { Icon } from "@iconify/react";

const Button = ({ children, loading = false, type = "button", ...props }) => {
  return (
    <button type={type} disabled={loading} className="btn-primary" {...props}>
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
