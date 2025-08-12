// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget({ productId }) {
    const container = useRef();

    useEffect(() => {
        if (!container.current) return;

        // Xóa nội dung cũ tránh render chồng
        container.current.innerHTML = "";

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            allow_symbol_change: true,
            calendar: false,
            details: false,
            hide_side_toolbar: true,
            hide_top_toolbar: false,
            hide_legend: false,
            hide_volume: false,
            hotlist: false,
            interval: "1",
            locale: "en",
            save_image: true,
            style: "1",
            symbol: productId ? `BINANCE:${productId}` : "BINANCE:BTCUSDT",
            theme: "light",
            timezone: "Etc/UTC",
            backgroundColor: "#ffffff",
            gridColor: "rgba(46, 46, 46, 0.16)",
            watchlist: [],
            withdateranges: false,
            compareSymbols: [],
            studies: [],
            autosize: true,
            height: 515
        });

        container.current.appendChild(script);
    }, [productId]); // chạy lại khi productId thay đổi

    return (
        <div
            className="tradingview-widget-container rounded-lg overflow-hidden "
            ref={container}
            style={{ height: "100%", width: "100%" }}
        >
            <div
                className="tradingview-widget-container__widget"
                style={{ height: "calc(100% - 32px)", width: "100%" }}
            ></div>
        </div>
    );
}

export default memo(TradingViewWidget);
