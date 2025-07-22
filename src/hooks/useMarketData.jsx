import { useState, useCallback } from "react";
import useSubscribeMarket from "./useSubscribeMarket";

export default function useMarketData(productId) {
  const [data, setData] = useState(null)

  const handleMessage = useCallback((msg) => {
    setData(msg);
  }, []);

  useSubscribeMarket(productId, handleMessage);

  return data;
}
