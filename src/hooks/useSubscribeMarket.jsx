import { useEffect } from "react";
import useSocket from "./useSocket";
import { useDispatch } from "react-redux";

export default function useSubscribeMarket(productId, onMessage) {
  const { stompClient, connected } = useSocket()
  const dispatch = useDispatch();
  useEffect(() => {
    if (!stompClient || !connected || !productId) return;

    const sub = stompClient.subscribe(`/topic/market/${productId}`, (msg) => {
      const data = JSON.parse(msg.body)
      onMessage(data)
      dispatch(updateMarketData({
        productId: data.productId,
        data,
      }));
    })

    return () => {
      sub.unsubscribe()
    }
  }, [stompClient, connected, productId, onMessage])
}
