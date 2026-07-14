const Logo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
        <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
          <path
            d="M12 2c-1 2.5-4 3.8-4 7a4 4 0 108 0c0-.9-.3-1.6-.7-2.3-.3.9-1 1.6-1.8 1.6-1.1 0-1.5-.9-1.5-1.8 0-1.1.7-1.8 0-4.5z"
            fill="white"
          />
        </svg>
      </span>

      <span className="text-sm font-bold tracking-tight text-white">
        ChatForge
      </span>
    </div>
  );
};

export default Logo;
