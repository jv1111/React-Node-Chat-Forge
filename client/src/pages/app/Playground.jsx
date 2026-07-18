import { useState } from "react";
import ClientSelector from "../../components/playground/ClientSelector";
import MessageBubble from "../../components/playground/MessageBubble";
import Button from "../../components/ui/Button";
import * as clientService from "../../services/client.service";
import * as clientAuthService from "../../services/clientAuth.service";

import { sampleClients } from "../../data/sampleClients";
import { sampleMessages } from "../../data/sampleMessages";
import usePlaygroundProject from "../../hooks/usePlaygroundProject";
import useClients from "../../hooks/useClients";

const Playground = () => {
  //TODO check if redux is good for this or its ok not to
  const [clientAuth, setClientAuth] = useState(null);
  const [availableClients, setAvailableClients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const { project, loading } = usePlaygroundProject();
  const { clients, refreshClients } = useClients(project?.projectCode);

  const handleCreateClient = async () => {
    try {
      const response = await clientService.createClient({
        projectCode: "prj_f71244199b3b1d9f",
        firstName: "John",
        middleName: "",
        lastName: "Doe",
      });

      await refreshClients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginClient = async (client) => {
    if (!project) return;

    try {
      const response = await clientAuthService.login({
        projectCode: project.projectCode,
        username: client.username,
        password: "playground",
      });

      setClientAuth(response.data);

      const available = await clientService.getAvailableClients(
        response.data.accessToken,
      );

      setAvailableClients(available.data.clients);

      // Auto-select the first available recipient
      setSelectedRecipient(available.data.clients[0]?._id ?? null);
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
            selectedClientId={clientAuth?.client.id}
            onSelect={handleLoginClient}
            action={
              <Button
                className="w-auto px-3 py-1.5"
                onClick={handleCreateClient}
              >
                Create
              </Button>
            }
          />

          {/* Recipient */}
          <ClientSelector
            title="Chat Recipient"
            description="Select who receives the messages."
            clients={availableClients}
            selectedClientId={selectedRecipient}
            onSelect={(client) => setSelectedRecipient(client._id)}
          />
        </aside>

        {/* CHAT */}

        <section className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          {/* Header */}

          <div className="border-b border-white/10 px-8 py-6">
            <h2 className="text-xl font-semibold text-white">Conversation</h2>

            <div className="mt-4 flex items-center gap-8 text-sm">
              <div>
                <p className="text-white/40">Logged in as</p>

                <p className="mt-1 font-medium text-white">🟢 Alice Johnson</p>
              </div>

              <div className="text-white/30">→</div>

              <div>
                <p className="text-white/40">Talking to</p>

                <p className="mt-1 font-medium text-white">🔵 Bob Smith</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-6 overflow-auto px-8 py-8">
            {sampleMessages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>

          {/* Input */}

          <div className="border-t border-white/10 p-6">
            <div className="flex gap-4">
              <input
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-white outline-none placeholder:text-white/30 focus:border-primary/50"
              />

              <Button className="btn-primary w-auto px-8">Send</Button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Playground;
