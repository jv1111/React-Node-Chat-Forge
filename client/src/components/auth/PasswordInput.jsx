import { useState } from "react";
import { useField } from "formik";
import { Icon } from "@iconify/react";

const PasswordInput = ({ label = "Password", ...props }) => {
  const [field, meta] = useField(props.name);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-input-group">
      <label htmlFor={props.name} className="label-auth">
        {label}
      </label>

      <div className="relative">
        <input
          {...field}
          {...props}
          id={props.name}
          type={showPassword ? "text" : "password"}
          className="input-auth pr-10"
        />

        <button
          type="button"
          onClick={() => setShowPassword((value) => !value)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-white/40 transition-colors hover:text-white/70"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            className="h-5 w-5"
          />
        </button>
      </div>

      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-danger">{meta.error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
