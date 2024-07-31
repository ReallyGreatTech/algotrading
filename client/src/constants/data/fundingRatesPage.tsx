import { Tab, Market, TableColumn } from '../../types';
import FundingRateMarketActions from '../../components/FundingRateMarketActions';
import Tooltip from '../../components/Tooltip';

export const fundingRatesTableColumn: TableColumn<Market>[] = [
  {
    label: 'Exchange',
    value: 'exchange',
    render: (row) => {
      const message = row.warnings?.map((w) => w.message).join('\n') || '';

      return (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center justify-between">
            {' '}
            <span className="w-[24px] h-[24px] ">
              {' '}
              <img
                src="/images/tokenImage.jpeg"
                className="w-full h-full rounded-full"
                alt=""
              />
            </span>{' '}
            <span> {row.exchange}</span>
          </div>
          {row.warnings?.length ? (
            <Tooltip text={<p>{message}</p>}>
              <div className="w-3 h-3 bg-red-500 rounded-full" />
            </Tooltip>
          ) : null}
        </div>
      );
    },
  },

  {
    label: 'Token',
    value: 'token',
  },
  {
    label: 'Price',
    value: 'mark_price',
  },
  {
    label: 'Funding',
    value: 'funding_rate_latest_annual',
    tableHeadCellClassName: 'min-w-[12em]',
    render: (item: Market) => {
      const isLive =
        item.funding_rate_live_annual !== undefined &&
        item.funding_rate_live_annual !== null;
      const fundingRate = isLive
        ? item.funding_rate_live_annual
        : item.funding_rate_latest_annual;
      const divClassName = isLive
        ? 'bg-green-500 w-3 h-3 rounded-full mr-8'
        : '';

      return (
        <div className="flex items-center justify-between gap-2">
          {fundingRate} <div className={divClassName}></div>
        </div>
      );
    },
  },
  {
    label: 'Open Interest',
    value: 'open_interest_usd',
    render: (item: Market) => {
      return `$${item.open_interest_usd}`;
    },
  },
  {
    label: 'Actions',
    value: '',
    render: (item: Market) => {
      return <FundingRateMarketActions market={item} />;
    },
  },
];
export const filteredFundingRateColumns: TableColumn<Market>[] = [
  {
    label: 'Exchange',
    value: 'exchange',
    render: (row) => {
      const message = row.warnings?.map((w) => w.message).join('\n') || '';

      return (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center justify-between">
            {' '}
            <span className="w-[24px] h-[24px] ">
              {' '}
              <img
                src="/images/tokenImage.jpeg"
                className="w-full h-full rounded-full"
                alt=""
              />
            </span>{' '}
            <span> {row.exchange}</span>
          </div>
          {row.warnings?.length ? (
            <Tooltip text={<p>{message}</p>}>
              <div className="w-3 h-3 bg-red-500 rounded-full" />
            </Tooltip>
          ) : null}
        </div>
      );
    },
  },

  {
    label: 'Funding',
    value: 'funding_rate_latest_annual',
    tableHeadCellClassName: 'min-w-[12em]',
    render: (item: Market) => {
      const isLive =
        item.funding_rate_live_annual !== undefined &&
        item.funding_rate_live_annual !== null;
      const fundingRate = isLive
        ? item.funding_rate_live_annual
        : item.funding_rate_latest_annual;
      const divClassName = isLive
        ? 'bg-green-500 w-3 h-3 rounded-full mr-8'
        : '';

      return (
        <div className="flex items-center justify-between gap-2">
          {fundingRate} <div className={divClassName}></div>
        </div>
      );
    },
  },
  {
    label: 'Open Interest',
    value: 'open_interest_usd',
    render: (item: Market) => {
      return `$${item.open_interest_usd}`;
    },
  },
];

export const orderBookTableColumnnNegative = [
  {
    label: 'Price',
    value: 'price',
    tableBodyCellClassName: 'text-[#EF4444]',
  },
  {
    label: 'Amount',
    value: 'amount',
  },
  {
    label: 'Total',
    value: 'total',
  },
];

export const orderBookTableColumnPostive = [
  {
    label: '',
    value: 'price',
    tableBodyCellClassName: 'text-[#419E6A]',
  },
  {
    label: '',
    value: 'amount',
  },
  {
    label: '',
    value: 'total',
  },
];

export const orderBookData = [
  {
    price: '63254.65',
    amount: '0.004459',
    total: '2,820.524',
  },
  {
    price: '63254.65',
    amount: '0.004459',
    total: '2,820.524',
  },
  {
    price: '63254.65',
    amount: '0.004459',
    total: '2,820.524',
  },
  {
    price: '63254.65',
    amount: '0.004459',
    total: '2,820.524',
  },
  {
    price: '63254.65',
    amount: '0.004459',
    total: '2,820.524',
  },
];

export const fundingHistoryTabs: Tab[] = [
  { label: 'All Results' },
  { label: 'Favorite' },
  { label: 'Hidden' },
];
