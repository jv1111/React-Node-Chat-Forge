const ConversationHeader = ({ client, recipient }) => {
  return (
    <div className="border-b border-white/10 px-8 py-6">
      <h2 className="text-xl font-semibold text-white">Conversation</h2>

      <div className="mt-4 flex items-center gap-8 text-sm">
        <div>
          <p className="text-white/40">Logged in as</p>

          <p className="mt-1 font-medium text-white">
            {client ? `🟢 ${client.firstName} ${client.lastName}` : "-"}
          </p>
        </div>

        <div className="text-white/30">→</div>

        <div>
          <p className="text-white/40">Talking to</p>

          <p className="mt-1 font-medium text-white">
            {recipient
              ? `🔵 ${recipient.firstName} ${recipient.lastName}`
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
