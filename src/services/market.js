export function start() {
  const ws = new WebSocket('wss://advanced-trade-ws.coinbase.com');

  ws.onopen = () => {
    console.log('Đã kết nối WebSocket');
    ws.send(JSON.stringify({ type: 'subscribe', channel: 'ticker', product_ids: ['BTC-USD'] }));
    ws.send(JSON.stringify({ type: 'subscribe', channel: 'heartbeats' }));
  };

  ws.onmessage = (message) => {
    try {
      const data = JSON.parse(message.data);
      if (data.channel === 'ticker') {
        data.events.forEach(event => {
          const ticker = event.tickers?.[0]; // optional chaining để tránh lỗi undefined
          if (ticker) {
            console.log(`[Ticker] BTC-USD: $${ticker.price} | 24h: ${ticker.volume_24_h}`);
          }
        });
      } else if (data.channel === 'heartbeats') {
        console.log(`Heartbeat #${data.events[0].heartbeat_counter}`);
      }
    } catch (err) {
      console.error('Parse JSON lỗi:', err);
    }
  };



  ws.onerror = err => console.error('WebSocket lỗi:', err);
  ws.onclose = () => {
    console.log(' WebSocket đóng, thử lại sau 5s...');
    setTimeout(start, 5000);
  };
}
