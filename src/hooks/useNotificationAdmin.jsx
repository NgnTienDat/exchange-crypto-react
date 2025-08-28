import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useSocket from "./useSocket";
import toast from "react-hot-toast";
import ToastOrderNotification from "../components/user/ToastOrderNotification";

export default function useNotificationAdmin(userId) {
  const queryClient = useQueryClient();
  const { stompClient, connected } = useSocket();

  useEffect(() => {
    if (!stompClient || !connected || !userId) return;

    const sub = stompClient.subscribe(`/user/${userId}/order/notification`, (msg) => {
      const payload = JSON.parse(msg.body);
      console.log("payload admin 2: ", payload);

      // Make sure we use the same query key format as useOrderBook
      queryClient.setQueryData(
        ["orderbook", payload.pairId, payload.side], // payload.side should be 'ASK' or 'BID'
        (oldOrders = []) => {
          if (!payload) return oldOrders;

          console.log(`Updating orderbook for ${payload.pairId} ${payload.side}:`, {
            orderId: payload.id,
            status: payload.status,
            price: payload.price,
            quantity: payload.quantity
          });

          // Remove order if FILLED or CANCELED
          if (["FILLED", "CANCELED"].includes(payload.status)) {
            const filteredOrders = oldOrders.filter((o) => o.id !== payload.id);
            console.log(`Removed order ${payload.id}, remaining orders:`, filteredOrders.length);
            return filteredOrders;
          }

          // Update existing order
          const existingIndex = oldOrders.findIndex((o) => o.id === payload.id);
          if (existingIndex !== -1) {
            const newOrders = [...oldOrders];
            newOrders[existingIndex] = {
              ...oldOrders[existingIndex],
              ...payload,
            };
            console.log(`Updated existing order at index ${existingIndex}`);
            return newOrders;
          }

          // Add new order and sort
          const newOrders = [...oldOrders, payload];
          console.log(`Added new order ${payload.id}`);

          // Sort based on side
          if (payload.side === "BID") {
            // BID orders: highest price first, then by creation time
            return newOrders.sort((a, b) =>
              a.price === b.price
                ? new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
                : b.price - a.price
            );
          } else if (payload.side === "ASK") {
            // ASK orders: lowest price first, then by creation time
            return newOrders.sort((a, b) =>
              a.price === b.price
                ? new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
                : a.price - b.price
            );
          }

          return newOrders;
        }
      );

      // Optional: Also invalidate queries to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: ["orderbook", payload.pairId],
        exact: false
      });
    });

    return () => {
      sub.unsubscribe();
    };
  }, [stompClient, connected, userId, queryClient]);
}