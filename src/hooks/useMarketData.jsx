import { useSelector } from "react-redux";


export default function useMarketData(productId) {
  return useSelector(state => state.marketData[productId]);
}