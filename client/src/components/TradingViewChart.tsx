import { useEffect, useRef, memo } from 'react';

const TradingViewWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptAddedRef = useRef(false);

  useEffect(() => {
    if (scriptAddedRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: 'DYDX:BTCUSD.P',
      interval: 'W',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '3',
      locale: 'en',
      hide_legend: true,
      allow_symbol_change: true,
      calendar: false,
      support_host: 'https://www.tradingview.com'
    });

    containerRef.current?.appendChild(script);
    scriptAddedRef.current = true;

  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef} style={{ height: '100%', width: '100%' }}>
      <div className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
