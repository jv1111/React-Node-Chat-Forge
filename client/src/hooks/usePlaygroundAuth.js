import { useState } from "react";

import * as clientAuthService from "../services/clientAuth.service";
import * as clientService from "../services/client.service";

const usePlaygroundAuth = (project) => {
  const [clientAuth, setClientAuth] = useState(null);
  const [availableClients, setAvailableClients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const loginClient = async (client) => {
    if (!project) return;

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
    setSelectedRecipient(available.data.clients[0]?._id ?? null);
  };

  return {
    clientAuth,
    availableClients,
    selectedRecipient,
    setSelectedRecipient,
    loginClient,
  };
};

export default usePlaygroundAuth;
