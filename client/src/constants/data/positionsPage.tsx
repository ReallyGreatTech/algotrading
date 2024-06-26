import { FiEdit2 } from 'react-icons/fi';
import {
  ExchangeBalance,
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

export const exchangesBalanceTableColumn: TableColumn<ExchangeBalance>[] = [
  {
    label: 'ID',
    value: 'id',
    tableHeadCellClassName: 'lg:min-w-[8em]',
  },
  {
    label: 'Exchange',
    value: 'exchange',
  },
  {
    label: 'Balance',
    value: 'balance',
  },
  {
    label: 'Created At',
    value: 'createdAt',
  },
  {
    label: 'Updated At',
    value: 'updatedAt',
  },
  {
    label: 'Wallet',
    value: 'wallet',
  },
];

export const sampleExchangeBalanceData = [
  {
    id: 1,
    exchange: 'Binance',
    balance: 1500.25,
    createdAt: '2023-06-01T12:00:00Z',
    updatedAt: '2023-06-15T12:00:00Z',
    wallet: 101,
  },
  {
    id: 2,
    exchange: 'Coinbase',
    balance: 2500.5,
    createdAt: '2023-06-02T14:30:00Z',
    updatedAt: '2023-06-16T14:30:00Z',
    wallet: 102,
  },
  {
    id: 3,
    exchange: 'Kraken',
    balance: 500.75,
    createdAt: '2023-06-03T16:45:00Z',
    updatedAt: '2023-06-17T16:45:00Z',
    wallet: 103,
  },
  {
    id: 4,
    exchange: 'Bitfinex',
    balance: 3000.0,
    createdAt: '2023-06-04T18:00:00Z',
    updatedAt: '2023-06-18T18:00:00Z',
    wallet: 104,
  },
  {
    id: 5,
    exchange: 'Huobi',
    balance: 1200.3,
    createdAt: '2023-06-05T20:15:00Z',
    updatedAt: '2023-06-19T20:15:00Z',
    wallet: 105,
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
