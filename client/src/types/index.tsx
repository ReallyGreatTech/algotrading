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
  percent_take_profit: number;
  percent_stop_loss: number;
  mark_price_usd: number;
  live_funding_rate_hourly: number | null;
  total_funding_received_usd: null;
}

export interface PositionsGroup {
  token: string;
  positions: Position[];
  min_opened_at: string;
  max_closed_at: string;
  non_leveraged_value: number;
  leveraged_value: number;
  total_funding_received_usd: number;
  avg_mark_price_usd: number;
  avg_daily_funding_usd: number;
  delta_pnl: number;
  min_stop_loss: number;
  max_stop_loss: number;
  min_take_profit: number;
  max_take_profit: number;
  min_liquidation_price: number;
  max_liquidation_price: number;
}

export interface Wallet {
  name: string;
  address: string;
  balance: number;
  id: number;
  investors: Investor[];
  exchange_balances: ExchangeBalance[];
  start_time_manual: string;
  total_investment: number;
  current_value: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateWalletData {
  id: number;
  data: {
    name?: string;
    address?: string;
    balance?: string;
  };
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

export interface InvestorActionQueryParams {
  investor?: number;
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
  created_at: string;
  updated_at: string;
  wallet: number;
}

export interface StatExchange {
  exchange: string;
  markets_count: number;
  history_count: number;
  latest_update: string;
  latest_update_ts: number;
  warning: false;
}

export interface Stat {
  exchanges_count: number;
  exchanges: StatExchange[];
}

export interface WalletItem {
  name: string;
  address: string;
  balance: string;
}
