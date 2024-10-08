import { Tab, Market, TableColumn } from "../../types";
import FundingRateMarketActions from "../../components/FundingRateMarketActions";
import Tooltip from "../../components/Tooltip";
import { IoWarningOutline } from "react-icons/io5";
import { formatCurrency, formatNumber } from "../../utils/formatNumbers";

export const fundingRatesTableColumn: TableColumn<Market>[] = [
  {
    label: "Exchange",
    value: "exchange",
    render: (row) => {
      const message = row.warnings?.map((w) => w.message).join("\n") || "";

      return (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center justify-between">
            {" "}
            <span className="w-[24px] h-[24px] ">
              {" "}
              <img
                src="/images/tokenImage.jpeg"
                className="w-full h-full rounded-full"
                alt=""
              />
            </span>{" "}
            <span> {row.exchange}</span>
          </div>
          {row.warnings?.length ? (
            <Tooltip text={<p>{message}</p>}>
              <IoWarningOutline className="text-red-500 mx-[2px]" />
            </Tooltip>
          ) : null}
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
    value: "mark_price_usd",
    tableBodyCellClassName:"min-w-[6rem] ",
    render: ({mark_price_usd}) => {
      return formatCurrency(mark_price_usd)
    },
    sortable: true
  },
  {
    label: "Funding",
    value: "funding_rate_latest_annual",
    tableHeadCellClassName: "min-w-[8em]",
    render: (item: Market) => {
      const isLive =
        item.funding_rate_live_annual !== undefined &&
        item.funding_rate_live_annual !== null;
      const fundingRate = isLive
        ? item.funding_rate_live_annual
        : item.funding_rate_latest_annual;
      const divClassName = isLive
        ? "bg-green-500 w-2 h-2 rounded-full ml-3"
        : "";

      return (
        <div
          className={`flex items-center ${
            fundingRate > 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {formatNumber(fundingRate)} <div className={divClassName}></div>
        </div>
      );
    },
    sortable: true,
    sortFunction: (a: Market, b: Market) => {
      const aRate = a.funding_rate_live_annual ?? a.funding_rate_latest_annual;
      const bRate = b.funding_rate_live_annual ?? b.funding_rate_latest_annual;
      return aRate - bRate;
    }
  },
  {
    label: "Open Interest",
    value: "open_interest_usd",
    tableHeadCellClassName: "min-w-[12em] ",
    tableBodyCellClassName: "mr-5 ",
    render: (item: Market) => {
      return formatCurrency(item.open_interest_usd);
    },
    sortable: true
  },
  {
    label: "Actions",
    value: "",
    render: (item: Market) => {
      return <FundingRateMarketActions market={item} />;
    },
  },
];
export const filteredFundingRateColumns: TableColumn<Market>[] = [
  {
    label: "Exchange",
    value: "exchange",
    render: (row) => {
      const message = row.warnings?.map((w) => w.message).join("\n") || "";

      return (
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center justify-between">
            {" "}
            <span className="w-[24px] h-[24px] ">
              {" "}
              <img
                src="/images/tokenImage.jpeg"
                className="w-full h-full rounded-full"
                alt=""
              />
            </span>{" "}
            <span> {row.exchange}</span>
          </div>
          {row.warnings?.length ? (
            <Tooltip text={<p>{message}</p>}>
              {/* <div className="w-3 h-3 bg-red-500 rounded-full" /> */}
              <IoWarningOutline className="text-red-500" />
            </Tooltip>
          ) : null}
        </div>
      );
    },
  },

  {
    label: "Funding",
    value: "funding_rate_latest_annual",
    tableHeadCellClassName: "min-w-[12em]",
    render: (item: Market) => {
      const isLive =
        item.funding_rate_live_annual !== undefined &&
        item.funding_rate_live_annual !== null;
      const fundingRate = isLive
        ? item.funding_rate_live_annual
        : item.funding_rate_latest_annual;
      const divClassName = isLive
        ? "bg-green-500 w-3 h-3 rounded-full mr-8"
        : "";

      return (
        <div className="flex items-center justify-between gap-2">
          {fundingRate} <div className={divClassName}></div>
        </div>
      );
    },
  },
  {
    label: "Open Interest",
    value: "open_interest_usd",
    render: (item: Market) => {
      return `$${item.open_interest_usd}`;
    },
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

export const orderBookData = [
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524",
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524",
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524",
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524",
  },
  {
    price: "63254.65",
    amount: "0.004459",
    total: "2,820.524",
  },
];

export const fundingHistoryTabs: Tab[] = [
  { label: "All Results" },
  { label: "Favorite" },
  { label: "Hidden" },
];
