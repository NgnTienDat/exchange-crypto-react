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
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useSocket from "./useSocket";

export default function useSubscribeDepth(productId) {
  const { stompClient, connected } = useSocket();
  const queryClient = useQueryClient();

  // ✅ Khởi tạo dữ liệu rỗng ban đầu
  const { data } = useQuery({
    queryKey: ["depth", productId],
    queryFn: () => ({ bids: [], asks: [] }), // trả về object trống
    initialData: { bids: [], asks: [] }
  });

  useEffect(() => {
    if (!stompClient || !connected || !productId) return;

    const sub = stompClient.subscribe(`/topic/trade/${productId}`, (msg) => {
      const depthUpdate = JSON.parse(msg.body);

      queryClient.setQueryData(["depth", productId], (old) => {
        if (!old) return depthUpdate;
        return {
          ...old,
          bids: depthUpdate.bids || old.bids,
          asks: depthUpdate.asks || old.asks,
        };
      });
    });

    return () => {
      sub.unsubscribe();
    };
  }, [stompClient, connected, productId, queryClient]);

  return data;
}
