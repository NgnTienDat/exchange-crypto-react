import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useSocket from "./useSocket";
import toast from "react-hot-toast";
import ToastOrderNotification from "../components/user/ToastOrderNotification";

export default function useNotification(userId, size = 7) {
  const queryClient = useQueryClient();
  const { stompClient, connected } = useSocket();

  useEffect(() => {
    if (!stompClient || !connected || !userId) return;

    const sub = stompClient.subscribe(
      `/user/${userId}/order/notification`,
      (msg) => {
        const payload = JSON.parse(msg.body);
        console.log("payload: ", payload);

        // Display toast
        toast.custom(<ToastOrderNotification payload={payload} />, {
          duration: 10000,
        });

        const pairId = payload.pairId;

        // Update ALL cached open orders pages for this pair
        queryClient.getQueryCache().findAll({
          queryKey: ["orders", "open", pairId],
          exact: false
        }).forEach((query) => {
          const [, , , page, querySize] = query.queryKey;
          
          queryClient.setQueryData(
            ["orders", "open", pairId, page, querySize],
            (oldData) => {
              if (!oldData) return oldData;

              // Remove order if FILLED or CANCELED
              if (payload.status === "FILLED" || payload.status === "CANCELED") {
                return {
                  ...oldData,
                  content: oldData.content.filter((o) => o.id !== payload.id),
                };
              }

              // Update existing order
              return {
                ...oldData,
                content: oldData.content.map((o) =>
                  o.id === payload.id ? { ...o, ...payload } : o
                ),
              };
            }
          );
        });

        // Update ALL cached history pages for this pair
        queryClient.getQueryCache().findAll({
          queryKey: ["orders", "history", pairId],
          exact: false
        }).forEach((query) => {
          const [, , , page, querySize] = query.queryKey;
          
          queryClient.setQueryData(
            ["orders", "history", pairId, page, querySize],
            (oldData) => {
              // Only add to history if order is completed (FILLED/CANCELED)
              if (payload.status !== "FILLED" && payload.status !== "CANCELED") {
                return oldData;
              }

              if (!oldData) {
                // Only add to page 0 if no data exists
                if (page === 0) {
                  return { content: [payload], page: 0, size: querySize, hasNext: false };
                }
                return oldData;
              }

              const exists = oldData.content.find((o) => o.id === payload.id);

              return {
                ...oldData,
                content: exists
                  ? oldData.content.map((o) =>
                      o.id === payload.id ? { ...o, ...payload } : o
                    )
                  : page === 0 // Only add new orders to page 0
                    ? [payload, ...oldData.content].slice(0, querySize)
                    : oldData.content
              };
            }
          );
        });
      }
    );

    return () => {
      sub.unsubscribe();
    };
  }, [stompClient, connected, userId, queryClient, size]);
}