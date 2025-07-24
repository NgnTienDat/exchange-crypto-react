import { useEffect } from "react";
import useSocket from "./useSocket";

export default function useSubscribeMarket(productId, onMessage) {
  const { stompClient, connected } = useSocket()

  useEffect(() => {
    if (!stompClient || !connected || !productId) return;

    const sub = stompClient.subscribe(`/topic/market/${productId}`, (msg) => {
      const data = JSON.parse(msg.body)
      onMessage(data)
    })

    return () => {
      sub.unsubscribe()
    }
  }, [stompClient, connected, productId, onMessage])
}
