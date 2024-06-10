import { ReactNode } from "react";

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
