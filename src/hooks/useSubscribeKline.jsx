import { useEffect } from "react";
import useSocket from "./useSocket";


export default function useSubscribeKline(productId, onMessage) {
  const { stompClient, connected } = useSocket()
  useEffect(() => {
    if (!stompClient || !connected || !productId) return;

    const sub = stompClient.subscribe(`/topic/kline/${productId}`, (msg) => {
      const data = JSON.parse(msg.body)
      // console.log("data: ", data)
      onMessage(data)
    })

    return () => {
      sub.unsubscribe()
    }
  }, [stompClient, connected, productId, onMessage])
}
