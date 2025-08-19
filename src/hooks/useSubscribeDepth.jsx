// import { useEffect } from "react";
// import useSocket from "./useSocket";


// export default function useSubscribeDepth(productId, onMessage) {
//   const { stompClient, connected } = useSocket()
//   useEffect(() => {
//     if (!stompClient || !connected || !productId) return;

//     const sub = stompClient.subscribe(`/topic/trade/${productId}`, (msg) => {
//       const data = JSON.parse(msg.body)
//       // console.log("data: ", data)
//       onMessage(data)
//     })

//     return () => {
//       sub.unsubscribe()
//     }
//   }, [stompClient, connected, productId, onMessage])
// }
// useSubscribeDepth.js
import { useEffect, useState } from "react";
import useSocket from "./useSocket";

export default function useSubscribeDepth(productId) {
  const { stompClient, connected } = useSocket();
  const [depth, setDepth] = useState({ bids: [], asks: [] });

  useEffect(() => {
    if (!stompClient || !connected || !productId) return;

    // Đăng ký kênh depth
    const sub = stompClient.subscribe(`/topic/trade/${productId}`, (msg) => {
      const depthUpdate = JSON.parse(msg.body);

      setDepth((prev) => ({
        bids: depthUpdate.bids?.length ? depthUpdate.bids : prev.bids,
        asks: depthUpdate.asks?.length ? depthUpdate.asks : prev.asks,
      }));
    });

    return () => {
      sub.unsubscribe();
    };
  }, [stompClient, connected, productId]);

  return depth;
}
