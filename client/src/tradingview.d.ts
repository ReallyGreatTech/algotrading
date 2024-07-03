interface TradingViewWidget {
    widget: (config: any) => void;
  }
  
  interface Window {
    TradingView?: TradingViewWidget;
  }