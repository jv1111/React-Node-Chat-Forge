const Card = ({ children, className = "", ...props }) => {
  return (
    <article
      className={`rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </article>
  );
};

export default Card;
