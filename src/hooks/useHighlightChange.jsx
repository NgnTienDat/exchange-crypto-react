import { useEffect, useRef, useState } from 'react';

export default function useCellHighlights(orders, key = 'price') {
  const [highlights, setHighlights] = useState({});
  const prevOrders = useRef([]);

  useEffect(() => {
    const changes = {};
    const prev = prevOrders.current;

    orders.forEach(order => {
      const id = order[key];
      const prevOrder = prev.find(o => o[key] === id);
      const diff = {};

      if (prevOrder) {
        if (prevOrder.price !== order.price) diff.price = true;
        if (prevOrder.amount !== order.amount) diff.amount = true;
        if (prevOrder.total !== order.total) diff.total = true;
      } else {
        diff.price = true;
        diff.amount = true;
        diff.total = true;
      }

      if (Object.keys(diff).length > 0) {
        changes[id] = diff;

        setTimeout(() => {
          setHighlights(h => {
            const copy = { ...h };
            if (copy[id]) delete copy[id];
            return copy;
          });
        }, 700);
      }
    });

    setHighlights(prev => ({ ...prev, ...changes }));
    prevOrders.current = orders;
  }, [orders, key]);

  return highlights;
}
