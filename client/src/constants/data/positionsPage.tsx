import {
  ExchangeBalance,
  Investor,
  InvestorAction,
  Position,
  StatExchange,
  TableColumn,
  Wallet,
} from '../../types';
import { shortenString } from '../../utils/stringTool';
import { RiDeleteBin5Line } from 'react-icons/ri';
import InvestorRowActions from '../../components/InvestorRowActions';
import { get24HourDateTime } from '../../utils/dateUtils';
import moment from 'moment';
import WalletRowActionButtons from '../../components/WalletRowActionButtons';

// const dispatch = useAppDispatch()

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
    tableHeadCellClassName: 'min-w-[5em]',
  },
  {
    label: 'Leverage',
    value: 'leverage',
    tableHeadCellClassName: 'min-w-[10em]',
  },
  {
    label: 'Leverage Amount',
    value: 'leveraged_amount',
    tableHeadCellClassName: 'min-w-[12em]',
  },
  {
    label: 'Average Mark Price',
    value: 'average_mark_price',
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
    value: 'stop_loss',
    tableHeadCellClassName: 'min-w-[10em]',
  },
  {
    label: 'TP',
    value: 'take_profit',
    tableHeadCellClassName: 'min-w-[10em]',
  },
  {
    label: 'Entry Price',
    value: 'entry_price',
    tableHeadCellClassName: 'min-w-[12em]',
  },
  {
    label: 'Liquidation Price',
    value: 'liquidation_price',
    tableHeadCellClassName: 'min-w-[12em]',
    // render: () => 'N/A',
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

export const subPositionsTableColumn: TableColumn<Position>[] = [
  {
    label: 'Token',
    value: 'token',
    tableHeadCellClassName: 'min-w-[8em]',
  },
  {
    label: 'Funding Rate',
    value: 'fundingRate',
    render: () => `Unknown`,
  },
  {
    label: 'Direction',
    value: 'direction',
    tableHeadCellClassName: 'min-w-[8em]',
    render(item) {
      return (
        <div
          className={`py-1 px-5 rounded-full uppercase max-w-[80px] ${
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
    label: 'Exchange',
    value: 'exchange',
    tableHeadCellClassName: 'min-w-[7em]',
  },
  {
    label: 'Mark Price',
    value: 'markPrice',
    tableHeadCellClassName: 'min-w-[8em]',
    render: () => `Unknown`,
  },
  {
    label: 'Daily Funding',
    value: 'daily_funding',
    render: () => `Unknown`,
  },
  {
    label: 'Entry Price',
    value: 'entry_price',
  },
  {
    label: 'Liquidation',
    value: 'liquidation_price',
  },
  {
    label: 'Exchange Balance',
    value: 'exchangeBalance',
    render: () => `Unknown`,
  },
  {
    label: '% Daily Funding',
    value: 'daily_funding',
    render: () => `Unknown`,
  },
  {
    label: 'Unrealized PNL',
    value: 'unrealized_pnl',
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
    value: 'created_at',
    render: (item) => get24HourDateTime(new Date(item.created_at)),
  },
  {
    label: 'Updated At',
    value: 'updated_at',
    render: (item) => get24HourDateTime(new Date(item.updated_at)),
  },
  {
    label: 'Wallet',
    value: 'wallet',
  },
];

export const walletsTableColumn: TableColumn<Wallet>[] = [
  {
    label: 'Wallet Address',
    value: 'address',
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
    value: 'total_investment',
  },
  {
    label: 'Current Value',
    value: 'current_value',
  },
  {
    label: '',
    value: '',
    render(wallet) {
      return <WalletRowActionButtons wallet={wallet} />;
    },
  },
];

export const investorTableColumn: TableColumn<Investor>[] = [
  {
    label: 'Investor Name',
    value: 'name',
  },
  {
    label: '% From Wallet',
    value: 'percentage_of_wallet',
    render: (entity) => {
      const [investorWallet] = entity.wallets.filter((w) => {
        const investorInWallet = w.investors.find(
          (investor) => investor.id === entity.id
        );

        if (investorInWallet?.id === entity.id) return w;
      });

      const investorInWallet = investorWallet?.investors.find(
        (i) => i.id === entity.id
      );
      if (investorInWallet?.percentage_of_wallet)
        return `${investorInWallet.percentage_of_wallet.toFixed(2)}`;

      return '0.00';
    },
  },
  {
    label: 'Joined Time',
    value: 'joinedTime',
    render(investor) {
      return new Date(investor.join_time_manual).toLocaleString();
    },
  },
  {
    label: 'Total Investment',
    value: 'totalInvestment',
    render: (item) => {
      let total = 0;
      item.wallets.forEach((w) => (total += w.total_investment));

      return total.toFixed(2);
    },
  },
  {
    label: '',
    value: '',
    render(investor) {
      return <InvestorRowActions investor={investor} />;
    },
  },
];

export const investorActionTableColumn: TableColumn<InvestorAction>[] = [
  {
    label: 'Investor Name',
    value: 'investorName',
    render: (investor) => `Investor ${investor.investor}`,
  },
  {
    label: 'Action',
    value: 'action',
    render(item) {
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

export const statusExchangesColumns: TableColumn<StatExchange>[] = [
  { label: 'Exchange', value: 'exchange' },
  { label: 'History Count', value: 'history_count' },
  { label: 'Market Count', value: 'markets_count' },
  {
    label: 'Latest Update',
    value: 'latest_update',
    render: (item) => {
      const timeUpdated = moment(item.latest_update).fromNow();
      return timeUpdated[0].toUpperCase() + timeUpdated.slice(1);
    },
  },
  {
    label: 'Warning',
    value: 'warning',
    render: (item) => {
      return item.warning ? (
        <div className="text-white/90 px-4 py-2 rounded-full bg-yellow-600 inline opacity-80">
          Warning
        </div>
      ) : (
        <div className="text-white/90 px-4 py-2 rounded-full bg-green-600 inline opacity-80">
          All good
        </div>
      );
    },
  },
];
