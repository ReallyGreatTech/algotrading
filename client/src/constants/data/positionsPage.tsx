import {
  formatNumber,
  formatPercentage,
  formatCurrency,
} from '../../utils/formatNumbers';
import {
  ExchangeBalance,
  Investor,
  InvestorAction,
  Monitor,
  Position,
  PositionsGroup,
  TableColumn,
  Wallet,
} from '../../types';
import { shortenString } from '../../utils/stringTool';
import InvestorRowActions from '../../components/InvestorRowActions';
import { get24HourDateTime } from '../../utils/dateUtils';
import WalletRowActionButtons from '../../components/WalletRowActionButtons';
import { Button, Popover } from 'antd';
import { HiMiniQuestionMarkCircle } from 'react-icons/hi2';
import { FaEye } from 'react-icons/fa';
import { IoMdAddCircle } from 'react-icons/io';
import MonitorMenu from '../../components/Monitors/MonitorMenu';

export const positionGroupsTableColumn: TableColumn<PositionsGroup>[] = [
  {
    label: 'Date',
    value: 'min_opened_at',
    tableHeadCellClassName: 'min-w-[8em]',
    render: (item) => new Date(item.min_opened_at).toLocaleDateString(),
  },
  {
    label: 'Time',
    value: 'opened_at',
    tableHeadCellClassName: 'min-w-[8em]',
    render: (item) => new Date(item.min_opened_at).toLocaleTimeString(),
  },
  {
    label: 'Token',
    value: 'token',
    tableHeadCellClassName: 'min-w-[5em]',
  },
  {
    label: 'Non-Leverage Amount',
    value: 'non_leveraged_value',
    render: (item) => formatNumber(item.non_leveraged_value),
    tableHeadCellClassName: 'min-w-[12em]',
  },
  {
    label: 'Leverage Amount',
    value: 'leveraged_value',
    render: (item) => formatNumber(item.leveraged_value),
    tableHeadCellClassName: 'min-w-[12em]',
  },
  {
    label: 'Total Funding Paid',
    value: 'total_funding_received_usd',
    render: (item) => formatNumber(item.total_funding_received_usd),
    tableHeadCellClassName: 'min-w-[12em]',
  },
  {
    label: 'Average Mark Price',
    value: 'avg_mark_price_usd',
    render: (item) => formatCurrency(item.avg_mark_price_usd),
    tableHeadCellClassName: 'min-w-[12em]',
  },
  {
    label: 'Average Daily Funding',
    value: 'average_funding_rate',
    tableHeadCellClassName: 'min-w-[12em]',
    render: (item) =>
      formatCurrency(
        item.avg_daily_funding_usd ? item.avg_daily_funding_usd : 0
      ),
  },
  {
    label: 'Delta PNL',
    value: 'delta_pnl',
    render: (item) => formatNumber(item.delta_pnl),
    tableHeadCellClassName: 'min-w-[12em]',
  },
  {
    label: 'SL',
    value: 'stop_loss',
    tableHeadCellClassName: 'min-w-[10em]',
    render(item) {
      return formatNumber((item.min_stop_loss + item.max_stop_loss) / 2);
    },
  },
  {
    label: 'TP',
    value: 'take_profit',
    tableHeadCellClassName: 'min-w-[10em]',
    render(item) {
      return formatNumber((item.min_take_profit + item.max_take_profit) / 2);
    },
  },
  {
    label: 'Entry Price',
    value: 'entry_price',
    tableHeadCellClassName: 'min-w-[12em]',
    render: (item) => {
      let totalEntryPrice = 0;

      if (!item.positions.length) return formatNumber(0);

      item.positions.forEach((p) => {
        totalEntryPrice += p.entry_price;
      });

      return formatNumber(totalEntryPrice / item.positions.length);
    },
  },
  {
    label: 'Non Leverage + Leverage Value',
    value: 'min_liquidation_price',
    tableHeadCellClassName: 'min-w-[12em]',
    render: (item) =>
      formatNumber(item.non_leveraged_value + item.leveraged_value),
  },
];

export const subPositionsTableColumn: TableColumn<Position>[] = [
  {
    label: 'Token',
    value: 'token',
    tableHeadCellClassName: 'min-w-[8em]',
  },
  {
    label: 'Exchange',
    value: 'exchange',
    tableHeadCellClassName: 'min-w-[7em]',
  },
  {
    label: 'Entry Price',
    value: 'entry_price',
    render: (item) => (
      <MonitorMenu
        fieldLabel="Entry Price"
        onField="entry_price"
        fieldValue={formatNumber(item.entry_price)}
        position={item}
      />
    ),
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
    label: 'Leverage',
    value: 'leverage',
    render: (item) => (
      <MonitorMenu
        fieldLabel="Leverage"
        onField="leverage"
        fieldValue={formatNumber(item.leverage)}
        position={item}
      />
    ),
  },
  {
    label: 'Non-Leverage Value',
    value: 'position_size',
    render: (item) => (
      <MonitorMenu
        onField="position_size"
        fieldLabel="Non-Leverage Value"
        fieldValue={formatNumber(item.position_size)}
        position={item}
      />
    ),
  },
  {
    label: 'Current Funding Rate',
    value: 'live_funding_rate_hourly',
    render(item) {
      return (
        <MonitorMenu
          onField="live_funding_rate_hourly"
          fieldLabel="Current Funding Rate"
          fieldValue={formatPercentage(
            item.live_funding_rate_hourly ? item.live_funding_rate_hourly : 0
          )}
          position={item}
        />
      );
    },
  },
  {
    label: 'Total Funding Received',
    value: 'total_funding_received_usd',
    render: (item) => (
      <MonitorMenu
        onField="total_funding_received_usd"
        fieldLabel="Total Funding Received"
        fieldValue={formatCurrency(item.total_funding_received_usd ?? 0)}
        position={item}
      />
    ),
  },
  {
    label: 'Mark Price',
    value: 'mark_price_usd',
    render: (item) => (
      <MonitorMenu
        onField="mark_price_usd"
        fieldLabel="Mark Price"
        fieldValue={formatCurrency(item.mark_price_usd)}
        position={item}
      />
    ),
  },
  {
    label: 'Liquidation',
    value: 'liquidation_price',
    render: (item) => (
      <MonitorMenu
        onField="liquidation_price"
        fieldLabel="Liquidation"
        fieldValue={formatCurrency(item.liquidation_price)}
        position={item}
      />
    ),
  },
  {
    label: 'Stop Loss',
    value: 'stop_loss',
    render: (item) => (
      <MonitorMenu
        onField="stop_loss"
        fieldLabel="Stop Loss"
        fieldValue={formatNumber(item.stop_loss)}
        position={item}
      />
    ),
  },
  {
    label: 'TP',
    value: 'take_profit',
    render: (item) => (
      <MonitorMenu
        onField="take_profit"
        fieldLabel="Take Profit"
        fieldValue={formatNumber(item.take_profit)}
        position={item}
      />
    ),
  },
  {
    label: '%SL',
    value: 'percent_stop_loss',
    render: (item) => formatPercentage(item.percent_stop_loss),
  },
  {
    label: '%TP',
    value: 'percent_take_profit',
    render: (item) => formatPercentage(item.percent_take_profit),
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
    render: (item) => formatCurrency(item.balance),
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
    render: (item) => formatCurrency(item.total_investment),
  },
  {
    label: 'Current Value',
    value: 'current_value',
    render: (item) => formatCurrency(item.current_value),
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

export const monitorTableColumn: TableColumn<Monitor>[] = [
  {
    label: "Position Field",
    value: "on_field",
    render: (item) => item.on_field ?? "NA",
    tableHeadCellClassName: "min-w-[7rem]",
  },
  // {
  //   label: "Base Value",
  //   value: "base_value",
  //   tableHeadCellClassName: "min-w-[7rem]",
  // },
  {
    label: "Evaluation Method",
    value: "evaluation_method",
    tableHeadCellClassName: "min-w-[]",
  },
  {
    label: "On Value",
    value: "on_value",
    tableHeadCellClassName: "min-w-[7rem]",
    render: (item) => {
      return formatCurrency(Number(item.on_value));
    },
  },
  {
    label: "Absolute distance",
    value: "on_abs_distance",
    render: (item) => item.on_abs_distance ?? "NA",
    tableHeadCellClassName: "min-w-[7rem]",
  },

  // {
  //   label: "Category",
  //   value: "category_name",
  //   tableHeadCellClassName: "min-w-[7rem]",
  // },
  {
    label: "",
    value: "",
    render(monitor) {
      return <MonitorRowActions monitor={monitor} />;
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
