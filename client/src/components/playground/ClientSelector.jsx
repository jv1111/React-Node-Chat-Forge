import ClientCard from "./ClientCard";

const ClientSelector = ({
  title,
  description,
  clients,
  selectedClientId,
  action,
  onSelect,
}) => {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>

        {action}
      </div>

      <p className="mt-1 text-sm text-white/40">{description}</p>

      <div className="mt-5 space-y-3">
        {clients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            selected={client.id === selectedClientId}
            onClick={() => onSelect?.(client)}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientSelector;
