import { useState, useEffect, useCallback } from "react";

import * as conversationService from "../services/conversation.service";
import * as messageService from "../services/message.service";
import * as socketService from "../services/socket.service";

const useConversation = (clientAuth, selectedRecipient) => {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const loadConversation = useCallback(async () => {
    if (!clientAuth || !selectedRecipient) return;

    try {
      const conversationResponse = await conversationService.getConversation(
        [selectedRecipient],
        clientAuth.accessToken,
      );

      setConversation(conversationResponse.data);

      if (!conversationResponse.data) {
        setMessages([]);
        return;
      }

      const messagesResponse =
        await conversationService.getConversationMessages(
          conversationResponse.data._id,
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

  // sets the room
  useEffect(() => {
    if (!conversation) return;

    socketService.joinRoom(conversation._id);

    return () => {
      socketService.leaveRoom(conversation._id);
    };
  }, [conversation]);

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

      setMessages((prev) => [...prev, response.data.message]);
      //TODO Send message successful
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
