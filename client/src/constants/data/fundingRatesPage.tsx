import { Tab } from '../../types';

export const fundingRatesTableColumn = [
  {
    label: 'Exchange',
    value: 'exchange',
    render: (row: any) => {
      return (
        <div className="flex gap-2 items-center">
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
    label: 'Annual Funding Latest',
    value: 'funding_rate_latest_annual',
    tableHeadCellClassName: 'min-w-[12em]',
  },
  {
    label: 'Open Interest',
    value: 'open_interest',
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
