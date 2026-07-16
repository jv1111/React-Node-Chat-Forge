const ClientCard = ({ client, selected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
        selected
          ? "border-primary/60 bg-linear-to-r from-primary/20 to-secondary/10"
          : "border-white/10 bg-white/5 hover:bg-white/10"
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${client.color}`}
      >
        {client.name
          .split(" ")
          .map((word) => word[0])
          .join("")}
      </div>

      <div>
        <p className="font-medium text-white">{client.name}</p>

        <p className="text-sm text-white/40">{client.username}</p>
      </div>
    </button>
  );
};

export default ClientCard;
