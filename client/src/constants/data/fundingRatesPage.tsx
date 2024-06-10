export const fundingRatesTableColumn = [
  {
    label: "Exchange",
    value: "exchange",
    render: (row) => {
      return (
        <div className="flex gap-2 items-center">
          {" "}
          <span className="w-[24px] h-[24px] "> <img src="/images/tokenImage.jpeg" className="w-full h-full rounded-full" alt="" /></span> <span> {row.exchange}</span>
        </div>
      );
    },
  },

  {
    label: "Token",
    value: "token",
  },
  {
    label: "Price",
    value: "price",
  },
  {
    label: "Current Funding",
    value: "currentFunding",
  },
  {
    label: "Open Interest",
    value: "openInterest",
  },
];

export const fundingRatesTableSampleData = [
  {
    image: "ImageSrc",
    exchange: "Binance",
    token: "BTC/USDT",
    price: "27000",
    currentFunding: "0.01",
    openInterest: "150000000",
  },
  {
    image: "ImageSrc",
    exchange: "FTX",
    token: "ETH/USDT",
    price: "1800",
    currentFunding: "0.02",
    openInterest: "50000000",
  },
  {
    image: "ImageSrc",
    exchange: "Bybit",
    token: "XRP/USDT",
    price: "0.50",
    currentFunding: "-0.005",
    openInterest: "10000000",
  },
  {
    image: "ImageSrc",
    exchange: "OKEx",
    token: "ADA/USDT",
    price: "0.30",
    currentFunding: "0.015",
    openInterest: "20000000",
  },
  {
    image: "ImageSrc",
    exchange: "Kraken",
    token: "SOL/USDT",
    price: "22",
    currentFunding: "0.007",
    openInterest: "30000000",
  },
  {
    image: "ImageSrc",
    exchange: "Kraken",
    token: "SOL/USDT",
    price: "22",
    currentFunding: "0.007",
    openInterest: "30000000",
  },
  {
    image: "ImageSrc",
    exchange: "FTX",
    token: "ETH/USDT",
    price: "1800",
    currentFunding: "0.02",
    openInterest: "50000000",
  },
  {
    image: "ImageSrc",
    exchange: "Bybit",
    token: "XRP/USDT",
    price: "0.50",
    currentFunding: "-0.005",
    openInterest: "10000000",
  },
  {
    image: "ImageSrc",
    exchange: "OKEx",
    token: "ADA/USDT",
    price: "0.30",
    currentFunding: "0.015",
    openInterest: "20000000",
  },
  {
    image: "ImageSrc",
    exchange: "Kraken",
    token: "SOL/USDT",
    price: "22",
    currentFunding: "0.007",
    openInterest: "30000000",
  },
  {
    image: "ImageSrc",
    exchange: "Kraken",
    token: "SOL/USDT",
    price: "22",
    currentFunding: "0.007",
    openInterest: "30000000",
  },
  {
    image: "ImageSrc",
    exchange: "Kraken",
    token: "SOL/USDT",
    price: "22",
    currentFunding: "0.007",
    openInterest: "30000000",
  },
  {
    image: "ImageSrc",
    exchange: "Kraken",
    token: "SOL/USDT",
    price: "22",
    currentFunding: "0.007",
    openInterest: "30000000",
  },
  {
    image: "ImageSrc",
    exchange: "Kraken",
    token: "SOL/USDT",
    price: "22",
    currentFunding: "0.007",
    openInterest: "30000000",
  },
  {
    image: "ImageSrc",
    exchange: "Kraken",
    token: "SOL/USDT",
    price: "22",
    currentFunding: "0.007",
    openInterest: "30000000",
  },
];


export const orderBookTableColumnnNegative = [
  {
    label: "Price",
    value: "price",
    tableBodyCellClassName: "text-[#EF4444]",
  },
  {
    label: "Amount",
    value: "amount",
  },
  {
    label: "Total",
    value: "total",
  },
];
export const orderBookTableColumnPostive = [
  {
    label: "",
    value: "price",
    tableBodyCellClassName: "text-[#419E6A]",
  },
  {
    label: "",
    value: "amount",
  },
  {
    label: "",
    value: "total",
  },
];

export const orderBookData =[
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524"
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524"
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524"
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524"
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524"
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524"
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524"
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524"
  }
]