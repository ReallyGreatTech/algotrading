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
  },
  {
    label: 'start Time',
    value: 'startTime',
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
    wallet: 'XXXXXX',
    startTime: 'xxxxxx',
    initialInvestment: 'xxxxxx',
    currentValue: 'xxxxxx',
  },
  {
    wallet: 'XXXXXX',
    startTime: 'xxxxxx',
    initialInvestment: 'xxxxxx',
    currentValue: 'xxxxxx',
  },
  {
    wallet: 'XXXXXX',
    startTime: 'xxxxxx',
    initialInvestment: 'xxxxxx',
    currentValue: 'xxxxxx',
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
  },
  {
    label: 'Initial Investment',
    value: 'initialInvestment',
  },
];

export const investorTableSampleData = [
  {
    investorName: 'XXXXXX',
    percentageFromWallet: 'xxxxxx',
    joinedTime: 'xxxxxx',
    initialInvestment: 'xxxxxx',
  },
  {
    investorName: 'XXXXXX',
    percentageFromWallet: 'xxxxxx',
    joinedTime: 'xxxxxx',
    initialInvestment: 'xxxxxx',
  },
  {
    investorName: 'XXXXXX',
    percentageFromWallet: 'xxxxxx',
    joinedTime: 'xxxxxx',
    initialInvestment: 'xxxxxx',
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
    investorName: 'XXXXXX',
    action: 'xxxxxx',
    amount: 'xxxxxx',
  },
  {
    investorName: 'XXXXXX',
    action: 'xxxxxx',
    amount: 'xxxxxx',
  },
  {
    investorName: 'XXXXXX',
    action: 'xxxxxx',
    amount: 'xxxxxx',
  },
];
