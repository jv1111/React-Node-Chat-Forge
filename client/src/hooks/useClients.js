import { useEffect, useState } from "react";

import * as clientService from "../services/client.service";

const useClients = (projectCode) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadClients = async () => {
    if (!projectCode) return;

    try {
      const response = await clientService.getClients(projectCode);

      setClients(response.data.clients);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClients();
  }, [projectCode]);

  return {
    clients,
    loading,
    refreshClients: loadClients,
  };
};

export default useClients;
