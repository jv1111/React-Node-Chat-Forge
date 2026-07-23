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

  // recieve socket message
  useEffect(() => {
    if (!clientAuth) return;

    const handleMessage = (message) => {
      setMessages((prev) => {
        console.log("Last previous message:", prev[prev.length - 1]);
        console.log("Incoming socket message:", message);

        return [...prev, message];
      });
    };

    socketService.onMessage(handleMessage);

    return () => {
      socketService.offMessage(handleMessage);
    };
  }, [clientAuth]);

  // TODO TEST THE SEND MESSAGE
  const sendMessage = (content) => {
    if (!content.trim()) return;
    socketService.sendMessage(selectedRecipient, content);
  };

  return {
    conversation,
    messages,
    sendMessage,
    loadConversation,
  };
};

export default useConversation;
