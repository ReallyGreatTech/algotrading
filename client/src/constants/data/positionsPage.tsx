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
