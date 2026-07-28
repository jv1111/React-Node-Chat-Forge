import { useCallback, useEffect, useRef } from "react";

const useConversationScroll = (
  messages,
  currentClientId,
  recipientId,
  loadOlderMessages,
) => {
  const containerRef = useRef(null);
  const previousScroll = useRef({
    height: 0,
    top: 0,
  });
  const isLoadingOlder = useRef(false);
  const hasScrolledInitially = useRef(false);

  const preserveScrollPosition = useCallback(() => {
    const container = containerRef.current;

    if (!container) return;

    previousScroll.current = {
      height: container.scrollHeight,
      top: container.scrollTop,
    };

    isLoadingOlder.current = true;
  }, []);

  useEffect(() => {
    hasScrolledInitially.current = false;
    isLoadingOlder.current = false;
    previousScroll.current = {
      height: 0,
      top: 0,
    };
  }, [currentClientId, recipientId]);

  useEffect(() => {
    if (hasScrolledInitially.current) return;
    if (messages.length === 0) return;

    const container = containerRef.current;

    if (!container) return;

    container.scrollTop = container.scrollHeight;

    hasScrolledInitially.current = true;
  }, [messages]);

  useEffect(() => {
    if (!isLoadingOlder.current) return;

    const container = containerRef.current;

    if (!container) return;

    const { height, top } = previousScroll.current;

    container.scrollTop = top + (container.scrollHeight - height);

    isLoadingOlder.current = false;
  }, [messages]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop <= 0) {
        preserveScrollPosition();
        loadOlderMessages();
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [loadOlderMessages, preserveScrollPosition]);

  return {
    containerRef,
    preserveScrollPosition,
  };
};

export default useConversationScroll;
