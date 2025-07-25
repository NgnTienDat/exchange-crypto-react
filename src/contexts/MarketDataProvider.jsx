// components/MarketDataProvider.jsx
import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';
import { useDispatch } from 'react-redux';
import { updateMarketData } from '../store/marketDataSlice';

const PRODUCT_IDS = ['BTC-USD', 'ETH-USD', 'DOGE-USD', 'XRP-USD ', 'USDT-USD']


export default function MarketDataProvider() {
  const { stompClient, connected } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!connected || !stompClient) return;

    const subs = PRODUCT_IDS.map(productId => {
      return stompClient.subscribe(`/topic/market/${productId}`, (msg) => {
        const data = JSON.parse(msg.body);
        dispatch(updateMarketData({ productId, data }));
      });
    });

    return () => {
      subs.forEach(sub => sub.unsubscribe());
    };
  }, [connected, stompClient]);

  return null;
}
