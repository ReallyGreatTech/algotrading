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

// export const fundingRatesTableSampleData = [
//   {
//     id: 63,
//     funding_rate_latest: 0.10638,
//     funding_rate_latest_annual: 931.8888,
//     funding_interval_hours: 1,
//     open_interest: 89658511,
//     open_interest_usd: 42856.768258,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.000478,
//     mark_price_usd: 0.000478,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'ZERO-PERP',
//     token: 'ZERO',
//     exchange: 'aevo',
//     created_at: '2024-06-08T13:58:28.688675',
//     updated_at: '2024-06-13T08:01:55.053650',
//   },
//   {
//     id: 359,
//     funding_rate_latest: 0.0559994033,
//     funding_rate_latest_annual: 490.5547725576,
//     funding_interval_hours: 1,
//     open_interest: 240.19,
//     open_interest_usd: 240.19,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.35021,
//     mark_price_usd: 0.35021,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'SLERF-USD',
//     token: 'SLERF',
//     exchange: 'rabbitx',
//     created_at: '2024-06-09T13:51:34.647320',
//     updated_at: '2024-06-13T08:01:05.176525',
//   },
//   {
//     id: 364,
//     funding_rate_latest: -0.04849199,
//     funding_rate_latest_annual: -424.7898324,
//     funding_interval_hours: 1,
//     open_interest: 4307.53,
//     open_interest_usd: 4307.53,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 13.7665,
//     mark_price_usd: 13.7665,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'TRUMP-USD',
//     token: 'TRUMP',
//     exchange: 'rabbitx',
//     created_at: '2024-06-09T13:51:40.299981',
//     updated_at: '2024-06-13T08:01:11.158939',
//   },
//   {
//     id: 362,
//     funding_rate_latest: -0.048180082,
//     funding_rate_latest_annual: -422.0575186704,
//     funding_interval_hours: 1,
//     open_interest: 631156.94,
//     open_interest_usd: 631156.94,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.14034,
//     mark_price_usd: 0.14034,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'PAC-USD',
//     token: 'PAC',
//     exchange: 'rabbitx',
//     created_at: '2024-06-09T13:51:38.356109',
//     updated_at: '2024-06-13T08:01:08.786509',
//   },
//   {
//     id: 354,
//     funding_rate_latest: 0.0364169924,
//     funding_rate_latest_annual: 319.0128537744,
//     funding_interval_hours: 1,
//     open_interest: 256.67,
//     open_interest_usd: 256.67,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 4.4115,
//     mark_price_usd: 4.4115,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'YES-USD',
//     token: 'YES',
//     exchange: 'rabbitx',
//     created_at: '2024-06-09T13:51:28.941807',
//     updated_at: '2024-06-13T08:00:58.010391',
//   },
//   {
//     id: 345,
//     funding_rate_latest: 0.0230464162,
//     funding_rate_latest_annual: 201.8866057368,
//     funding_interval_hours: 1,
//     open_interest: 6978.43,
//     open_interest_usd: 6978.43,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.0578,
//     mark_price_usd: 0.0578,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'RLB-USD',
//     token: 'RLB',
//     exchange: 'rabbitx',
//     created_at: '2024-06-09T13:51:19.065093',
//     updated_at: '2024-06-13T08:00:46.893718',
//   },
//   {
//     id: 7,
//     funding_rate_latest: 0.02088,
//     funding_rate_latest_annual: 182.9088,
//     funding_interval_hours: 1,
//     open_interest: 1598070,
//     open_interest_usd: 14985.10239,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.009377,
//     mark_price_usd: 0.009377,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'OX-PERP',
//     token: 'OX',
//     exchange: 'aevo',
//     created_at: '2024-06-08T13:44:05.128510',
//     updated_at: '2024-06-13T08:03:42.378898',
//   },
//   {
//     id: 106,
//     funding_rate_latest: 0.01994,
//     funding_rate_latest_annual: 174.6744,
//     funding_interval_hours: 1,
//     open_interest: 108705,
//     open_interest_usd: 239260.13982,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 2.201004,
//     mark_price_usd: 2.201004,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'TKO-PERP',
//     token: 'TKO',
//     exchange: 'aevo',
//     created_at: '2024-06-08T13:59:25.383683',
//     updated_at: '2024-06-13T08:02:33.000024',
//   },
//   {
//     id: 102,
//     funding_rate_latest: -0.0197288,
//     funding_rate_latest_annual: -172.824288,
//     funding_interval_hours: 1,
//     open_interest: 973254,
//     open_interest_usd: 123642.18816,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.12704,
//     mark_price_usd: 0.12704,
//     oracle_price_usd: 0.12662,
//     average_funding: null,
//     origin_symbol: 'CANTO',
//     token: 'CANTO',
//     exchange: 'hyperliquid',
//     created_at: '2024-06-08T13:59:20.415444',
//     updated_at: '2024-06-13T08:01:45.435963',
//   },
//   {
//     id: 367,
//     funding_rate_latest: 0.019185896,
//     funding_rate_latest_annual: 168.0684491352,
//     funding_interval_hours: 1,
//     open_interest: 17337.62,
//     open_interest_usd: 17337.62,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.1547,
//     mark_price_usd: 0.1547,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'MOTHER-USD',
//     token: 'MOTHER',
//     exchange: 'rabbitx',
//     created_at: '2024-06-11T11:01:06.641510',
//     updated_at: '2024-06-13T08:01:14.652422',
//   },
//   {
//     id: 145,
//     funding_rate_latest: 0.01886,
//     funding_rate_latest_annual: 165.2136,
//     funding_interval_hours: 1,
//     open_interest: 24752.8,
//     open_interest_usd: 15375.0036976,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.621142,
//     mark_price_usd: 0.621142,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'SYN-PERP',
//     token: 'SYN',
//     exchange: 'aevo',
//     created_at: '2024-06-08T14:05:57.199283',
//     updated_at: '2024-06-13T08:03:09.918504',
//   },
//   {
//     id: 150,
//     funding_rate_latest: 0.01878,
//     funding_rate_latest_annual: 164.5128,
//     funding_interval_hours: 1,
//     open_interest: 533449,
//     open_interest_usd: 119500.577735,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.224015,
//     mark_price_usd: 0.224015,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'SHFL-PERP',
//     token: 'SHFL',
//     exchange: 'aevo',
//     created_at: '2024-06-08T14:07:32.348969',
//     updated_at: '2024-06-13T08:00:35.514996',
//   },
//   {
//     id: 275,
//     funding_rate_latest: -0.0169463038,
//     funding_rate_latest_annual: -148.4496214632,
//     funding_interval_hours: 1,
//     open_interest: 4901.9607843137,
//     open_interest_usd: 5000,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: null,
//     mark_price_usd: 1.02,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'STRKUSD',
//     token: 'STRK',
//     exchange: 'hmx-arbitrum',
//     created_at: '2024-06-08T14:11:14.896825',
//     updated_at: '2024-06-13T08:02:48.221697',
//   },
//   {
//     id: 29,
//     funding_rate_latest: 0.0159096,
//     funding_rate_latest_annual: 139.368096,
//     funding_interval_hours: 1,
//     open_interest: 25907700.6,
//     open_interest_usd: 7176951.220212,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 0.27702,
//     mark_price_usd: 0.27702,
//     oracle_price_usd: 0.275,
//     average_funding: null,
//     origin_symbol: 'CRV',
//     token: 'CRV',
//     exchange: 'hyperliquid',
//     created_at: '2024-06-08T13:57:40.113963',
//     updated_at: '2024-06-13T08:00:45.865556',
//   },
//   {
//     id: 48,
//     funding_rate_latest: -0.01214,
//     funding_rate_latest_annual: -106.3464,
//     funding_interval_hours: 1,
//     open_interest: 42767.23,
//     open_interest_usd: 326731.92903879,
//     volume_24h: null,
//     volume_24h_usd: null,
//     mark_price: 7.639773,
//     mark_price_usd: 7.639773,
//     oracle_price_usd: null,
//     average_funding: null,
//     origin_symbol: 'TON-PERP',
//     token: 'TON',
//     exchange: 'aevo',
//     created_at: '2024-06-08T13:58:08.174176',
//     updated_at: '2024-06-13T08:01:30.100143',
//   },
// ];

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
