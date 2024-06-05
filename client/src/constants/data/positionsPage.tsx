import { Investor, Wallet } from '../../types';
import { shortenString } from '../../utils/stringTool';

export const positionsTableColumn = [
  {
    label: 'Date',
    value: 'date',
  },
  {
    label: 'Time',
    value: 'time',
  },
  {
    label: 'Platform',
    value: 'platform',
  },
  {
    label: 'Direct',
    value: 'direct',
  },
  {
    label: 'Leverage Value',
    value: 'leverageValue',
  },
  {
    label: 'Leverage',
    value: 'leverage',
  },
  {
    label: 'Position Size',
    value: 'positionSize',
  },
  {
    label: 'Entry Price',
    value: 'entryPrice',
  },
  {
    label: 'MarkPrice',
    value: 'markPrice',
  },
  {
    label: 'Liquidation',
    value: 'liquidation',
  },
  {
    label: 'Funding Recieved Rate',
    value: 'fundingRecievedRate',
  },
  {
    label: 'Funding Recieved',
    value: 'fundingRecieved',
  },
  {
    label: 'Funding Paid Rate',
    value: 'fundingPaidRate',
  },
  {
    label: 'Funding Paid',
    value: 'fundingPaid',
  },
  {
    label: 'ROI',
    value: 'roi',
  },
  {
    label: 'Unrealized PnL',
    value: 'unrealizedPnl',
  },
  {
    label: 'Wallet Asset',
    value: 'walletAsset',
  },
  {
    label: 'Account',
    value: 'account',
  },
];

export const positionsTableSampleData = [
  {
    id: '1',
    date: '05/09/2024',
    time: '8:04',
    platform: 'Aevo',
    direct: 'Long',
    leverageValue: '11619',
    leverage: '3',
    positionSize: '3873',
    entryPrice: '17.1250',
    markPrice: '15.489',
    liquidation: '8.996',
    fundingRecievedRate: '2.67',
    fundingRecieved: '321.945829',
    fundingPaidRate: '__',
    fundingPaid: '__',
    roi: '8.30%',
    unrealizedPnl: '1236.44',
    walletAsset: '4860.27',
    account: '__',
  },
  {
    id: '2',
    date: '06/09/2024',
    time: '10:15',
    platform: 'Binance',
    direct: 'Short',
    leverageValue: '8432',
    leverage: '5',
    positionSize: '1542',
    entryPrice: '21.5678',
    markPrice: '19.234',
    liquidation: '14.876',
    fundingRecievedRate: '__',
    fundingRecieved: '__',
    fundingPaidRate: '0.98',
    fundingPaid: '129.583620',
    roi: '5.75%',
    unrealizedPnl: '829.33',
    walletAsset: '3521.18',
    account: '__',
  },
  {
    id: '3',
    date: '07/09/2024',
    time: '12:30',
    platform: 'FTX',
    direct: 'Long',
    leverageValue: '9574',
    leverage: '4',
    positionSize: '2748',
    entryPrice: '18.7543',
    markPrice: '17.845',
    liquidation: '10.432',
    fundingRecievedRate: '1.24',
    fundingRecieved: '239.482710',
    fundingPaidRate: '__',
    fundingPaid: '__',
    roi: '6.12%',
    unrealizedPnl: '1045.87',
    walletAsset: '4278.49',
    account: '__',
  },
  {
    id: '4',
    date: '08/09/2024',
    time: '14:45',
    platform: 'Kraken',
    direct: 'Short',
    leverageValue: '12459',
    leverage: '2',
    positionSize: '4938',
    entryPrice: '16.9821',
    markPrice: '15.789',
    liquidation: '11.234',
    fundingRecievedRate: '__',
    fundingRecieved: '__',
    fundingPaidRate: '1.56',
    fundingPaid: '187.563910',
    roi: '7.85%',
    unrealizedPnl: '1129.66',
    walletAsset: '5012.38',
    account: '__',
  },
  {
    id: '5',
    date: '09/09/2024',
    time: '16:20',
    platform: 'Coinbase',
    direct: 'Long',
    leverageValue: '13241',
    leverage: '3',
    positionSize: '4425',
    entryPrice: '19.6512',
    markPrice: '18.234',
    liquidation: '12.876',
    fundingRecievedRate: '2.45',
    fundingRecieved: '284.937620',
    fundingPaidRate: '__',
    fundingPaid: '__',
    roi: '9.34%',
    unrealizedPnl: '1357.24',
    walletAsset: '5347.61',
    account: '__',
  },
];

export const walletsTableColumn = [
  {
    label: 'Wallet',
    value: 'wallet',
    render(item: Wallet) {
      return shortenString(item.wallet, 10);
    },
  },
  {
    label: 'start Time',
    value: 'startTime',
    render(item: Wallet) {
      return new Date(item.startTime).toLocaleString();
    },
  },
  {
    label: 'Initial Investment',
    value: 'initialInvestment',
  },
  {
    label: 'Current Value',
    value: 'currentValue',
  },
];

export const walletsTableSampleData = [
  {
    wallet: '0xA1b2C3d4E5f67890aBCdEf1234567890AbCdEf12',
    startTime: '2023-01-01T00:00:00Z',
    initialInvestment: '5000',
    currentValue: '7500',
  },
  {
    wallet: '0xB2c3D4e5F67890abCDeF1234567890abCDEf1234',
    startTime: '2023-02-15T00:00:00Z',
    initialInvestment: '3000',
    currentValue: '4500',
  },
  {
    wallet: '0xC3d4E5f67890AbcDEF1234567890ABCDef123456',
    startTime: '2023-03-01T00:00:00Z',
    initialInvestment: '10000',
    currentValue: '9500',
  },
  {
    wallet: '0xD4e5F67890abCDEf1234567890AbCdEf12345678',
    startTime: '2023-04-20T00:00:00Z',
    initialInvestment: '7500',
    currentValue: '8200',
  },
  {
    wallet: '0xE5f67890AbCDEF1234567890abCDEF1234567890',
    startTime: '2023-05-10T00:00:00Z',
    initialInvestment: '2000',
    currentValue: '1800',
  },
  {
    wallet: '0xF67890abCDEf1234567890ABCdEf123456789012',
    startTime: '2023-06-25T00:00:00Z',
    initialInvestment: '6000',
    currentValue: '6100',
  },
  {
    wallet: '0x1234567890AbCdEf1234567890aBcDeF12345678',
    startTime: '2023-07-15T00:00:00Z',
    initialInvestment: '12000',
    currentValue: '13000',
  },
  {
    wallet: '0x234567890ABCDEF1234567890abcdef123456789',
    startTime: '2023-08-05T00:00:00Z',
    initialInvestment: '4000',
    currentValue: '4200',
  },
  {
    wallet: '0x34567890abcdef1234567890ABCDEF1234567890',
    startTime: '2023-09-12T00:00:00Z',
    initialInvestment: '8000',
    currentValue: '8500',
  },
  {
    wallet: '0x4567890ABCDEF1234567890abcdef12345678901',
    startTime: '2023-10-01T00:00:00Z',
    initialInvestment: '500',
    currentValue: '700',
  },
];

export const investorTableColumn = [
  {
    label: 'Investor Name',
    value: 'investorName',
  },
  {
    label: '% From Wallet',
    value: 'percentageFromWallet',
  },
  {
    label: 'Joined Time',
    value: 'joinedTime',
    render(investor: Investor) {
      return new Date(investor.joinedTime).toLocaleString();
    },
  },
  {
    label: 'Initial Investment',
    value: 'initialInvestment',
  },
];

export const investorTableSampleData = [
  {
    investorName: 'Alice Johnson',
    percentageFromWallet: '25',
    joinedTime: '2023-01-05T14:30:00Z',
    initialInvestment: '1250',
  },
  {
    investorName: 'Bob Smith',
    percentageFromWallet: '40',
    joinedTime: '2023-02-18T09:00:00Z',
    initialInvestment: '1200',
  },
  {
    investorName: 'Charlie Brown',
    percentageFromWallet: '30',
    joinedTime: '2023-03-10T16:45:00Z',
    initialInvestment: '3000',
  },
  {
    investorName: 'Diana Prince',
    percentageFromWallet: '20',
    joinedTime: '2023-04-25T12:15:00Z',
    initialInvestment: '1500',
  },
  {
    investorName: 'Ethan Hunt',
    percentageFromWallet: '35',
    joinedTime: '2023-05-14T10:00:00Z',
    initialInvestment: '700',
  },
  {
    investorName: 'Fiona Gallagher',
    percentageFromWallet: '50',
    joinedTime: '2023-06-29T11:30:00Z',
    initialInvestment: '3000',
  },
  {
    investorName: 'George Weasley',
    percentageFromWallet: '15',
    joinedTime: '2023-07-20T13:45:00Z',
    initialInvestment: '1800',
  },
  {
    investorName: 'Hannah Abbott',
    percentageFromWallet: '45',
    joinedTime: '2023-08-07T15:00:00Z',
    initialInvestment: '1800',
  },
  {
    investorName: 'Ian Malcolm',
    percentageFromWallet: '10',
    joinedTime: '2023-09-15T17:30:00Z',
    initialInvestment: '800',
  },
  {
    investorName: 'Jessica Jones',
    percentageFromWallet: '20',
    joinedTime: '2023-10-10T09:15:00Z',
    initialInvestment: '100',
  },
];

export const investorActionTableColumn = [
  {
    label: 'Investor Name',
    value: 'investorName',
  },
  {
    label: 'Action',
    value: 'action',
  },
  {
    label: 'Amount',
    value: 'amount',
  },
];

export const investorActionTableSampleData = [
  {
    investorName: 'Alice Johnson',
    action: 'deposit',
    amount: '500',
  },
  {
    investorName: 'Bob Smith',
    action: 'withdraw',
    amount: '200',
  },
  {
    investorName: 'Charlie Brown',
    action: 'deposit',
    amount: '1000',
  },
  {
    investorName: 'Diana Prince',
    action: 'deposit',
    amount: '300',
  },
  {
    investorName: 'Ethan Hunt',
    action: 'withdraw',
    amount: '150',
  },
  {
    investorName: 'Fiona Gallagher',
    action: 'deposit',
    amount: '2500',
  },
  {
    investorName: 'George Weasley',
    action: 'withdraw',
    amount: '500',
  },
  {
    investorName: 'Hannah Abbott',
    action: 'deposit',
    amount: '600',
  },
  {
    investorName: 'Ian Malcolm',
    action: 'withdraw',
    amount: '300',
  },
  {
    investorName: 'Jessica Jones',
    action: 'deposit',
    amount: '50',
  },
];
