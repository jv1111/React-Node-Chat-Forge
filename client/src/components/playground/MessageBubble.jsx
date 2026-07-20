const MessageBubble = ({ senderName, message, senderId, clientId }) => {
  const isOwner = senderId === clientId;

  return (
    <div className={`flex ${isOwner ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-lg rounded-2xl px-5 py-3 ${
          isOwner
            ? "bg-linear-to-r from-primary to-secondary text-white"
            : "bg-white/10 text-white"
        }`}
      >
        <p
          className={`mb-1 text-xs ${
            isOwner ? "text-white/70" : "text-white/40"
          }`}
        >
          {senderName}
        </p>

        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
