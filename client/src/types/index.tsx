import { ReactNode } from 'react';

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
  funding_rate_latest_annual?:  number;
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
}
