import { FiEdit2 } from 'react-icons/fi';
import {
  Investor,
  InvestorAction,
  Position,
  TableColumn,
  Wallet,
} from '../../types';
import { shortenString } from '../../utils/stringTool';
import { RiDeleteBin5Line } from 'react-icons/ri';

export const positionsTableColumn: TableColumn<Position>[] = [
  {
    label: 'Date',
    value: 'date',
    tableHeadCellClassName: 'min-w-[8em]',
    render: (item) => new Date(item.opened_at).toLocaleDateString(),
  },
  {
    label: 'Time',
    value: 'opened_at',
    tableHeadCellClassName: 'min-w-[8em]',
    render: (item) => new Date(item.opened_at).toLocaleTimeString(),
  },
  {
    label: 'Token',
    value: 'token',
  },
  {
    label: 'Direction',
    value: 'direction',
    render(item) {
      return (
        <div
          className={`py-1 px-5 rounded-full uppercase ${
            item.direction.toLowerCase() === 'short'
              ? 'bg-[#EF4444]'
              : 'bg-[#419E6A]'
          }`}
        >
          {item.direction}
        </div>
      );
    },
  },
  {
    label: 'Leverage',
    value: 'leverage',
    tableHeadCellClassName: 'min-w-[10em]',
  },
  {
    label: 'Non Leverage',
    value: 'nonLeverage',
    tableHeadCellClassName: 'min-w-[12em]',
    render: () => 'N/A',
  },
  {
    label: 'Average Daily Funding',
    value: 'nonLeverageValue',
    tableHeadCellClassName: 'min-w-[12em]',
    render: () => 'N/A',
  },
  {
    label: 'SL',
    value: 'entryPrice',
    tableHeadCellClassName: 'min-w-[10em]',
    render: () => 'N/A',
  },
  {
    label: 'TP',
    value: 'entry_price',
  },
  {
    label: 'Liquidation',
    value: 'liquidation',
    render: () => 'N/A',
  },
  {
    label: '%SL',
    value: 'fundingRecieved',
    tableHeadCellClassName: 'min-w-[10em]',
    render: () => 'N/A',
  },
  {
    label: '%TP',
    value: 'fundingPaidRate',
    tableHeadCellClassName: 'min-w-[10em]',
    render: () => 'N/A',
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
    fundingRecieved: '31.94',
    fundingPaidRate: '__',
    fundingPaid: '__',
    roi: '8.30%',
    unrealizedPnl: '1236.44',
    walletAsset: '4860.27',
    account: '__',
    token: 'BTC',
    nonLeverageValue: '11619',
    totalFundingReceived: '11619',
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
    token: 'ETH',
    nonLeverageValue: '8432',
    totalFundingReceived: '8432',
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
    fundingRecieved: '23.48',
    fundingPaidRate: '__',
    fundingPaid: '__',
    roi: '6.12%',
    unrealizedPnl: '1045.87',
    walletAsset: '4278.49',
    account: '__',
    token: 'LTC',
    nonLeverageValue: '9574',
    totalFundingReceived: '9574',
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
    token: 'XRP',
    nonLeverageValue: '12459',
    totalFundingReceived: '12459',
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
    fundingRecieved: '24.93',
    fundingPaidRate: '__',
    fundingPaid: '__',
    roi: '9.34%',
    unrealizedPnl: '1357.24',
    walletAsset: '5347.61',
    account: '__',
    token: 'ADA',
    nonLeverageValue: '13241',
    totalFundingReceived: '13241',
  },
];

export const walletsTableColumn: TableColumn<Wallet>[] = [
  {
    label: 'Wallet',
    value: 'wallet',
    render(item: Wallet) {
      return shortenString(item.address, 10);
    },
    tableHeadCellClassName: '',
    tableBodyCellClassName: '',
  },
  {
    label: 'Start Time',
    value: 'startTime',
    render(item: Wallet) {
      return new Date(item.start_time_manual).toLocaleString();
    },
  },
  {
    label: 'Total Investment',
    value: 'initialInvestment',
    render: () => 'N/A',
  },
  {
    label: 'Current Value',
    value: 'currentValue',
    render: () => 'N/A',
  },
  {
    label: '',
    value: '',
    render(item) {
      return (
        <div className="flex gap-4">
          <button
            onClick={() => {
              console.log('Editing: ', item);
            }}
            className="p-1 hover:bg-primary-dark rounded-full"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => {
              console.log('Deleting: ', item);
            }}
            className="p-1 hover:bg-primary-dark rounded-full"
          >
            <RiDeleteBin5Line />
          </button>
        </div>
      );
    },
  },
];

export const investorTableColumn = [
  {
    label: 'Investor Name',
    value: 'name',
  },
  {
    label: '% From Wallet',
    value: 'percentageFromWallet',
    render: () => 'N/A',
  },
  {
    label: 'Joined Time',
    value: 'joinedTime',
    render(investor: Investor) {
      return new Date(investor.join_time_manual).toLocaleString();
    },
  },
  {
    label: 'Total Investment',
    value: 'totalInvestment',
    render: () => 'N/A',
  },
  {
    label: '',
    value: '',
    render(item: any) {
      return (
        <div className="flex gap-4">
          <button
            onClick={() => {
              console.log('Editing: ', item);
            }}
            className="p-1 hover:bg-primary-dark rounded-full"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => {
              console.log('Deleting: ', item);
            }}
            className="p-1 hover:bg-primary-dark rounded-full"
          >
            <RiDeleteBin5Line />
          </button>
        </div>
      );
    },
  },
];

export const investorActionTableColumn = [
  {
    label: 'Investor Name',
    value: 'investorName',
    render: () => 'Unknown',
  },
  {
    label: 'Action',
    value: 'action',
    render(item: InvestorAction) {
      return (
        <span
          className={`py-1 px-5 rounded-full uppercase ${
            item.action.toLowerCase() === 'withdraw'
              ? 'bg-[#EF4444]'
              : 'bg-[#419E6A]'
          }`}
        >
          {item.action}
        </span>
      );
    },
  },
  {
    label: 'Amount',
    value: 'amount',
    render: (item: InvestorAction) => item.amount.toFixed(4),
  },
];
