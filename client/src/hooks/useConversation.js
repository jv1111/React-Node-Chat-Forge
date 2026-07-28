import { useState, useEffect, useCallback } from "react";

import * as conversationService from "../services/conversation.service";
import * as messageService from "../services/message.service";
import * as socketService from "../services/socket.service";

const useConversation = (clientAuth, selectedRecipient) => {
  const PAGE_SIZE = 10;

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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
          10,
        );

      setMessages(messagesResponse.data);
    } catch (error) {
      console.error(error);
    }
  }, [clientAuth, selectedRecipient]);

  useEffect(() => {
    setLoadingOlder(false);
    setHasMore(true);
  }, [clientAuth?.client._id, selectedRecipient]);

  const loadOlderMessages = useCallback(async () => {
    if (!conversation || loadingOlder || !hasMore) return;

    const oldestMessage = messages[0];

    if (!oldestMessage) return;

    try {
      setLoadingOlder(true);

      const response = await conversationService.getConversationMessages(
        conversation._id,
        clientAuth.accessToken,
        PAGE_SIZE,
        oldestMessage.createdAt,
      );

      const olderMessages = response.data;

      if (olderMessages.length === 0) {
        setHasMore(false);
        return;
      }

      setMessages((prev) => [...olderMessages, ...prev]);

      if (olderMessages.length < PAGE_SIZE) {
        setHasMore(false);
      }
    } finally {
      setLoadingOlder(false);
    }
  }, [conversation, clientAuth, messages, loadingOlder, hasMore]);

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
    loadingOlder,
    hasMore,
    sendMessage,
    loadConversation,
    loadOlderMessages,
  };
};

export default useConversation;
