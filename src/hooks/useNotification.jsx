import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useSocket from "./useSocket";
import toast from "react-hot-toast";
import ToastOrderNotification from "../components/user/ToastOrderNotification";

export default function useNotification(userId) {
  const queryClient = useQueryClient();
  const { stompClient, connected } = useSocket();

  useEffect(() => {
    if (!stompClient || !connected || !userId) return;

    const sub = stompClient.subscribe(`/user/${userId}/order/notification`, (msg) => {
      const payload = JSON.parse(msg.body);
      console.log("payload: ", payload)
      toast.custom(<ToastOrderNotification payload={payload} />, {
        duration: 10000,
      });

      queryClient.setQueryData(
        ["orders", "open", payload.pairId],
        (oldOrders) => {
          if (!oldOrders) return oldOrders;

          if (payload.status === "FILLED" || payload.status === "CANCELED") {
            return oldOrders.filter(
              (o) => o.id !== payload.id
            );
          }

          return oldOrders.map((o) =>
            o.id === payload.id
              ? { ...o, ...payload }
              : o
          );
        }
      );

      queryClient.setQueryData(
        ["orders", "history", payload.pairId],
        (oldOrders) => {
          if (!oldOrders) return [payload];

          const exists = oldOrders.find(
            (o) => o.id === payload.id
          );

          return exists
            ? oldOrders.map((o) =>
              o.id === payload.id ? { ...o, ...payload } : o
            )
            : [payload, ...oldOrders];
        }
      );

      
    }
    );

    return () => {
      sub.unsubscribe();
    };
  }, [stompClient, connected, userId, queryClient]);
}
