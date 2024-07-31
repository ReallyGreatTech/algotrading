import moment from 'moment';
import { StatExchange, TableColumn } from '../../types';

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
    label: 'Latest RT',
    value: 'latest_rt',
    render: (item) => {
      const timeUpdated = moment(item.latest_update_realtime).fromNow();
      return timeUpdated[0].toUpperCase() + timeUpdated.slice(1);
    },
  },
  {
    label: 'M&H',
    value: 'm&h',
    tableHeadCellClassName: 'min-w-[10em]',
    render: (item) => {
      return (
        <div>
          <p>
            {item.markets_and_history_failure_rate.failure_rate_percent.toFixed(
              2
            )}
            %
          </p>
          <p className="text-xs opacity-60">
            {item.markets_and_history_failure_rate.failed_tasks_count}/
            {item.markets_and_history_failure_rate.total_tasks_count}
          </p>
        </div>
      );
    },
  },
  {
    label: 'RT Fail Rate',
    value: 'rt_fail_rate',
    tableHeadCellClassName: 'min-w-[10em]',
    render: (item) => {
      return (
        <div>
          <p>
            {item.realtime_data_failure_rate.failure_rate_percent.toFixed(2)}%
          </p>
          <p className="text-xs opacity-60">
            {item.realtime_data_failure_rate.failed_tasks_count}/
            {item.realtime_data_failure_rate.total_tasks_count}
          </p>
        </div>
      );
    },
  },
  {
    label: 'RT Status',
    value: 'rt_status',
    render: (item) => {
      let bgColor = '';
      switch (item.realtime_status.toLocaleLowerCase()) {
        case 'ok':
          bgColor = '#16A34A';
          break;
        case 'warning':
          bgColor = '#CA8A04';
          break;
        case 'error':
          bgColor = '#DC2626';
          break;
        default:
          bgColor = '#DDDDDD';
      }
      return (
        <div
          className={`text-white/90 px-4 py-2 rounded-full inline opacity-80 ${
            item.realtime_status.toLowerCase() !== 'ok'
              ? 'capitalize'
              : 'uppercase'
          }`}
          style={{ backgroundColor: bgColor }}
        >
          {item.realtime_status.toLowerCase()}
        </div>
      );
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
