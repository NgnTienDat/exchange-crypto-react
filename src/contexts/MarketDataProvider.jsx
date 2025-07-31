import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';
import { useDispatch } from 'react-redux';
import { updateMarketData } from '../store/marketDataSlice';
import { PRODUCT_IDS } from '../utils/helper';


export default function MarketDataProvider() {
  const { stompClient, connected } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!connected || !stompClient) return;

    const subs = PRODUCT_IDS.map(productId => {
      return stompClient.subscribe(`/topic/market/${productId}`, (msg) => {
        const data = JSON.parse(msg.body);
        // console.log("market data: ", data)
        dispatch(updateMarketData({ productId, data }));
      });
    });

    return () => {
      subs.forEach(sub => sub.unsubscribe());
    };
  }, [connected, stompClient]);

  return null;
}
