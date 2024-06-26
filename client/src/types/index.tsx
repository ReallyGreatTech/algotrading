import { CSSProperties, ReactNode } from 'react';

export interface TableColumn<T> {
  label: string;
  value: string;
  tableBodyCellClassName?: string;
  tableHeadCellClassName?: string;
  render?(item: T): ReactNode;
}

export interface Position {
  id: number;
  token: string;
  exchange: string;
  opened_at: string;
  closed_at: unknown;
  status: string;
  direction: string;
  leverage: number;
  leveraged_amount: number;
  position_size: number;
  entry_price: number;
  liquidation_price: number;
  stop_loss: number;
  take_profit: number;
  roi_percent: number;
  unrealized_pnl: number;
  wallet_asset: number;
  account_balance: number;
  equity: number;
  created_at: string;
  updated_at: string;
  trading_pair: string;
  wallet: number;
}

export interface Wallet {
  name: string;
  address: string;
  id: number;
  investors: Investor[];
  start_time_manual: string;
  total_investment: number;
  current_value: number;
  createdAt: string;
  updatedAt: string;
}

export interface Investor {
  id: number;
  name: string;
  wallets: Wallet[];
  actions: InvestorAction[];
  join_time_manual: string;
  total_investment: number;
  createdAt: string;
  updated: string;
  percentage_of_wallet?: number;
}

export interface AddInvestorData {
  name: string;
  join_time_manual: string;
}

export interface UpdateInvestorData {
  id: number;
  data: {
    name?: string;
    join_time_manual?: string;
  };
}

export interface InvestorAction {
  id: 13;
  investorName: string;
  action: string;
  amount: number;
  investor: number;
  time: string;
  wallet: number;
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

export interface RowParams {
  token: string;
  exchange: string;
}

export interface SelectedFundingHistoryState {
  loading: boolean;
  data: FundingHistory[];
  error: string;
}

export interface ExchangeBalance {
  id: number;
  exchange: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  wallet: number;
}
