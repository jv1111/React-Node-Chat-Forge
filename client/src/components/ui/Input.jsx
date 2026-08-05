const Input = ({ label, className = "", ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={props.id || props.name} className="label-auth">
          {label}
        </label>
      )}

      <input {...props} className={`input-auth mt-2 ${className}`} />
    </div>
  );
};

export default Input;
