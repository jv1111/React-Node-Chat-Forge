const ClientCard = ({ client, selected = false, onClick }) => {
  const fullName = [client.firstName, client.middleName, client.lastName]
    .filter(Boolean)
    .join(" ");

  const initials = fullName
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
        selected
          ? "border-primary/60 bg-linear-to-r from-primary/20 to-secondary/10"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
        {initials}
      </div>

      <div>
        <p className="font-medium text-white">{fullName}</p>
      </div>
    </button>
  );
};

export default ClientCard;
