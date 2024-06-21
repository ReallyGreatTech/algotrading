// TradingViewWidget.tsx
import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const isAppended = useRef<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
        {
           "symbols": [
            [
              "COINBASE:SOLUSD|1D"
            ],
            [
              "COINBASE:BTCUSD|1D"
            ],
            [
              "BINANCE:NOTUSDT|1D"
            ],
            [
              "BINANCE:PEPEUSDT|1D"
            ],
            [
              "BINANCE:DOGEUSDT|1D"
            ],
            [
              "CRYPTOCAP:TOTAL3|1D"
            ],
            [
              "BINANCE:XRPUSDT|1D"
            ],
            [
              "BINANCE:BNBUSDT|1D"
            ],
            [
              "BINANCE:NEARUSDT|1D"
            ],
            [
              "BINANCE:FETUSDT|1D"
            ],
            [
              "BINANCE:FTMUSDT|1D"
            ],
            [
              "BINANCE:SOLUSD|1D"
            ],
            [
              "BINANCE:MATICUSDT|1D"
            ],
            [
              "BINANCE:DOTUSDT|1D"
            ],
            [
              "BINANCE:INJUSDT|1D"
            ],
            [
              "BINANCE:AVAXUSDT|1D"
            ],
            [
              "BINANCE:1000PEPEUSDT.P|1D"
            ],
            [
              "BINANCE:LTCUSDT|1D"
            ],
            [
              "BINANCE:SOLUSDT.P|1D"
            ],
            [
              "BINANCE:JASMYUSDT|1D"
            ],
            [
              "BYBIT:BTCUSDT.P|1D"
            ],
            [
              "BINANCE:OPUSDT|1D"
            ],
            [
              "COINBASE:SHIBUSD|1D"
            ],
            [
              "BINANCE:WLDUSDT|1D"
            ],
            [
              "CRYPTOCAP:TOTAL2|1D"
            ],
            [
              "BITSTAMP:XRPUSD|1D"
            ],
            [
              "BINANCE:LDOUSDT|1D"
            ],
            [
              "BINANCE:CRVUSDT|1D"
            ],
            [
              "BINANCE:GRTUSDT|1D"
            ],
            [
              "COINBASE:ONDOUSD|1D"
            ],
            [
              "BINANCE:IOUSDT|1D"
            ],
            [
              "BINANCE:SEIUSDT|1D"
            ],
            [
              "BNC:BLX|1D"
            ]
          ],
          "chartOnly": true,
          "width": "100%",
          "height": "100%",
          "locale": "en",
          "colorTheme": "dark",
          "backgroundColor": "#1A202C",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "widgetFontColor": "rgba(255, 255, 255, 1)",
          "fontSize": "10",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "area",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "lineWidth": 2,
          "lineType": 0,
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ]
        }`;

    if (container.current && !isAppended.current) {
      container.current.appendChild(script);
      isAppended.current = true;
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          {/* <span className="blue-text">Track all markets on TradingView</span> */}
        </a>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
