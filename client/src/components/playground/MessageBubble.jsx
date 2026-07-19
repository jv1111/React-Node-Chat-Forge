const MessageBubble = ({ message }) => {
  const senderName =
    typeof message.sender === "string"
      ? message.sender
      : `${message.sender.firstName} ${message.sender.lastName}`;

  return (
    <div className={`flex ${message.own ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg rounded-2xl px-5 py-3 ${
          message.own
            ? "bg-linear-to-r from-primary to-secondary text-white"
            : "bg-white/10 text-white"
        }`}
      >
        <p
          className={`mb-1 text-xs ${
            message.own ? "text-white/70" : "text-white/40"
          }`}
        >
          {senderName}
        </p>

        <p>{message.content ?? message.message}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
