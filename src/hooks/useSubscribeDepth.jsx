import { useEffect } from "react";
import useSocket from "./useSocket";


export default function useSubscribeDepth(productId, onMessage) {
  const { stompClient, connected } = useSocket()
  useEffect(() => {
    if (!stompClient || !connected || !productId) return;

    const sub = stompClient.subscribe(`/topic/trade/${productId}`, (msg) => {
      const data = JSON.parse(msg.body)
      // console.log("data: ", data)
      onMessage(data)
    })

    return () => {
      sub.unsubscribe()
    }
  }, [stompClient, connected, productId, onMessage])
}
