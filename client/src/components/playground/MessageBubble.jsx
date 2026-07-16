const MessageBubble = ({ message }) => {
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
          {message.sender}
        </p>

        <p>{message.message}</p>
      </div>
    </div>
  );
};

export default MessageBubble;
