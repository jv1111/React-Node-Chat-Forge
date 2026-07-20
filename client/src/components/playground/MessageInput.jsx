import Button from "../ui/Button";

const MessageInput = ({ value, onChange, onSend }) => {
  return (
    <div className="border-t border-white/10 p-6">
      <div className="flex gap-4">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none placeholder:text-white/30 focus:border-primary/50"
        />

        <Button className="btn-primary w-auto px-8" onClick={onSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
