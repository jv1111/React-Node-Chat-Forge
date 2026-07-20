import { useState, useEffect, useCallback } from "react";

import * as conversationService from "../services/conversation.service";
import * as messageService from "../services/message.service";

const useConversation = (clientAuth, selectedRecipient) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const loadConversation = useCallback(async () => {
    if (!clientAuth || !selectedRecipient) return;

    try {
      const response = await conversationService.getConversation(
        [selectedRecipient],
        clientAuth.accessToken,
      );

      setConversation(response.data);

      if (!response.data) {
        setMessages([]);
        return;
      }

      const messagesResponse =
        await conversationService.getConversationMessages(
          response.data._id,
          clientAuth.accessToken,
        );

      setMessages(messagesResponse.data);
    } catch (error) {
      console.error(error);
    }
  }, [clientAuth, selectedRecipient]);

  useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    try {
      const response = await messageService.sendMessage(
        {
          toClientId: selectedRecipient,
          content,
        },
        clientAuth.accessToken,
      );

      setConversation(response.data.conversation);

      await loadConversation();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    conversation,
    messages,
    sendMessage,
    loadConversation,
  };
};

export default useConversation;
