const AuthFormHeader = ({ title, description }) => {
  return (
    <div>
      <h2 className="auth-title">{title}</h2>

      <p className="auth-description">{description}</p>
    </div>
  );
};

export default AuthFormHeader;
