// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TickerTape() {
  const container = useRef();

  useEffect(() => {
    if (container.current && !container.current.querySelector("script")) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "symbols": [
          { "proName": "BINANCE:SOLUSDT", "title": "Sol" },
          { "proName": "BINANCE:ADAUSDT", "title": "Ada" },
          { "proName": "BINANCE:ETHUSDT", "title": "Etherium" },
          { "proName": "BINANCE:BTCUSDT", "title": "Bitcoin" },
          { "proName": "BINANCE:DOTUSDT", "title": "Dot" },
          { "proName": "BINANCE:BNBUSDT", "title": "Bnb" }
        ],
        "colorTheme": "light",
        "locale": "en",
        "isTransparent": false,
        "showSymbolLogo": true,
        "displayMode": "regular"
      }`;
      container.current.appendChild(script);
    }
  }, []);


  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TickerTape);
