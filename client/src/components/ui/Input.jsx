import { useField } from "formik";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);

  return (
    <div className="auth-input-group">
      <label htmlFor={props.name} className="label-auth">
        {label}
      </label>

      <input {...field} {...props} id={props.name} className="input-auth" />

      {meta.touched && meta.error && (
        <p className="text-sm text-danger mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default Input;
