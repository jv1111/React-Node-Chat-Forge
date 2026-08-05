const SectionBadge = ({ children }) => {
  return (
    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
      {children}
    </span>
  );
};

export default SectionBadge;
