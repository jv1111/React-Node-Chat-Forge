import { useState } from "react";
import ClientSelector from "../../components/playground/ClientSelector";
import MessageBubble from "../../components/playground/MessageBubble";
import ConversationHeader from "../../components/playground/ConversationHeader";
import MessageInput from "../../components/playground/MessageInput";
import Button from "../../components/ui/Button";

import usePlaygroundProject from "../../hooks/usePlaygroundProject";
import usePlaygroundAuth from "../../hooks/usePlaygroundAuth";
import useClients from "../../hooks/useClients";
import useConversation from "../../hooks/useConversation";

import { joinRoom, sendMessage } from "../../services/socket.service";

const Playground = () => {
  const [messageInput, setMessageInput] = useState("");

  const { project } = usePlaygroundProject();
  const {
    clientAuth,
    availableClients,
    selectedRecipient,
    setSelectedRecipient,
    loginClient,
  } = usePlaygroundAuth(project);
  const { clients, refreshClients } = useClients(project?.projectCode);
  const { messages, sendMessage } = useConversation(
    clientAuth,
    selectedRecipient,
  );

  const recipient = availableClients.find(
    (client) => client._id === selectedRecipient,
  );

  const handleSelectRecipient = (client) => {
    setSelectedRecipient(client._id);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    try {
      await sendMessage(messageInput);

      setMessageInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex h-[calc(100vh-4rem)] flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold text-white">Chat Playground</h1>

        <p className="mt-2 text-white/50">
          Simulate conversations between your sample clients.
        </p>
      </header>

      <div className="grid flex-1 grid-cols-[320px_1fr] gap-6 overflow-hidden">
        {/* LEFT PANEL */}

        <aside className="flex flex-col gap-6 overflow-auto">
          {/* Login Client */}

          <ClientSelector
            title="Login Client"
            description="Select the client that will send messages."
            clients={clients}
            selectedClientId={clientAuth?.client._id}
            onSelect={loginClient}
            action={<Button className="w-auto px-3 py-1.5">Create</Button>}
          />

          {/* Recipient */}
          <ClientSelector
            title="Chat Recipient"
            description="Select who receives the messages."
            clients={availableClients}
            selectedClientId={selectedRecipient}
            onSelect={handleSelectRecipient}
          />
        </aside>

        {/* CHAT */}
        <section className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <ConversationHeader
            client={clientAuth?.client}
            recipient={recipient}
          />

          {/* Message */}
          <div className="flex-1 space-y-6 overflow-auto px-8 py-8">
            {messages.map((message) => (
              <MessageBubble
                key={message._id}
                senderName={`${message.sender.firstName} ${message.sender.lastName}`}
                message={message.content}
                senderId={message.sender._id}
                clientId={clientAuth?.client._id}
              />
            ))}
          </div>

          {/* Input */}
          <MessageInput
            value={messageInput}
            onChange={setMessageInput}
            onSend={handleSendMessage}
          />
        </section>
      </div>
    </section>
  );
};

export default Playground;
