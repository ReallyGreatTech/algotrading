import { CSSProperties, ReactNode } from 'react';

export interface TableColumn<T> {
  label: string;
  value: string;
  tableBodyCellClassName?: string;
  tableHeadCellClassName?: string;
  render?(item: T): ReactNode;
}

export interface DataItem {
  id: string;
  date: string;
  time: string;
  platform: string;
  direct: string;
  leverageValue: string;
  leverage: string;
  positionSize: string;
  entryPrice: string;
  markPrice: string;
  liquidation: string;
  fundingRecievedRate: string;
  fundingRecieved: string;
  fundingPaidRate: string;
  fundingPaid: string;
  roi: string;
  unrealizedPnl: string;
  walletAsset: string;
  account: string;
}

export interface Wallet {
  wallet: string;
  startTime: string;
  initialInvestment: string;
  currentValue: string;
}

export interface Investor {
  investorName: string;
  percentageFromWallet: string;
  joinedTime: string;
  initialInvestment: string;
}

export interface InvestorAction {
  investorName: string;
  action: string;
  amount: string;
}
export interface TableItem {
  id?: number;
  funding_rate_latest?: number;
  funding_rate_latest_annual?: number;
  funding_interval_hours?: number;
  open_interest?: number;
  open_interest_usd?: number;
  volume_24h?: null;
  volume_24h_usd?: null;
  mark_price?: number;
  mark_price_usd?: number;
  oracle_price_usd?: null;
  average_funding?: null;
  origin_symbol?: string;
  token?: string;
  exchange?: string;
  created_at?: string;
  updated_at?: string;
}
export interface TableIte {
  exchange: string;
  token: string;
  price: string;
  currentFunding: string;
  openInterest: string;
}

export interface OrderbookItem {
  price: string;
  amount: string;
  total: string;
}

export interface DialogProps {
  open: boolean;
  onClose(): void;
  children?: ReactNode;
  fullWidth?: boolean;
  maxWidth?: string;
  rootStyle?: CSSProperties;
}

export interface PriceChartDataItem {
  price: number;
  time: number;
}

export interface FundingHistory {
  id: number;
  exchange: string;
  token: string;
  origin_funding: number;
  hourly_funding: number;
  daily_funding: number;
  annual_funding: number;
  timestamp: string;
  trading_pair: number;
}

export interface FundingHistoryState {
  loading: boolean;
  data: FundingHistory[];
  error: string;
}

export interface FetchFundingHistoryResponse {
  results: FundingHistory[];
}

export interface TokenInitialState {
  selectedToken: string;
  loading: boolean;
  tokens: string[];
  error: string;
}

export interface Market {
  id: 246;
  funding_rate_latest: 0.0112817623;
  funding_rate_latest_annual: 98.8282373976;
  funding_interval_hours: 1;
  open_interest: 23.0788502447;
  open_interest_usd: 1113.02371075;
  volume_24h: null;
  volume_24h_usd: null;
  mark_price: null;
  mark_price_usd: 48.227;
  oracle_price_usd: null;
  average_funding: null;
  origin_symbol: 'ORDIUSD';
  token: 'ORDI';
  exchange: 'hmx-arbitrum';
  created_at: '2024-06-08T14:10:28.732290';
  updated_at: '2024-06-14T10:02:11.347750';
}

export interface FetchMarketParams {
  token?: string;
  annual_min_funding_rate?: number;
  funding_normalization?: number;
  min_open_interest_usd?: number;
}
