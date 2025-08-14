import { useEffect } from "react";
import useSocket from "./useSocket";
import useUser from "./useUser";
import ToastOrderNotification from "../components/user/ToastOrderNotification";
import toast from "react-hot-toast";

export default function useNotification() {
  const { stompClient, connected } = useSocket();
  const { user } = useUser();

  useEffect(() => {
    if (!stompClient || !connected || !user?.id) return;

    const sub = stompClient.subscribe(
      `/user/${user.id}/order/notification`,
      (message) => {
        try {
          const payload = JSON.parse(message.body);
          console.log("Thông báo đơn hàng:", payload);

          toast.custom(<ToastOrderNotification payload={payload} />, {
            duration: 10000,
          });
        } catch (e) {
          console.error("Lỗi khi xử lý tin nhắn:", e, message.body);
        }
      }
    );

    return () => {
      sub.unsubscribe();
    };
  }, [stompClient, connected, user?.id]);
}
