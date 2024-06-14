import AppTable from "../components/AppTable";
import PrimaryButton from "../components/PrimaryButton";
import { GrNext } from "react-icons/gr";
import { OrderbookItem, TableItem } from "../types";
import {
  fundingRatesTableColumn,
  orderBookData,
  orderBookTableColumnPostive,
  orderBookTableColumnnNegative,
} from "../constants/data/fundingRatesPage";
import SearchInput from "../components/SearchInput";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useEffect, useState } from "react";
import {
  fetchTokens,
  updateSelectedToken,
} from "../redux/features/tokens/tokenSlice";
import { fetchFundingHistory } from "../redux/features/fundingHistory/fundingHistorySlice";
import { getUniqueExchanges } from "../utils/getUniqueExchanges";
import ExchangeSearchInput from "../components/ExchangeSearchInput";
import { fetchMarket } from "../redux/features/market/marketSlice";
import TimeFilter from "../components/TimeFilter";
import { AiOutlineExpandAlt } from "react-icons/ai";
import PriceChart from "../components/PriceChart";
import { Bars } from "react-loader-spinner";

interface Market {
  id: 246;
  funding_rate_latest: 0.0112817623;
  funding_rate_latest_annual: 98.8282373976;
  funding_interval_hours: 1;
  open_interest: 23.0788502447;
  open_interest_usd: 1113.02371075;
  volume_24h: null;
  volume_24h_usd: null;
  mark_price: null;
  mark_price_usd: 48.227;
  oracle_price_usd: null;
  average_funding: null;
  origin_symbol: "ORDIUSD";
  token: "ORDI";
  exchange: "hmx-arbitrum";
  created_at: "2024-06-08T14:10:28.732290";
  updated_at: "2024-06-14T10:02:11.347750";
}

const FundingRates = () => {
  const tokensData = useAppSelector((state) => state.token.tokens);
  const marketData = useAppSelector((state) => state.market.data);
  const marketDataLoading = useAppSelector((state) => state.market.loading);
  const [filteredMarketData, setFilteredMarketData] = useState(marketData);
  const [minimumFundingRate, setMinimumFundingRate] = useState("");
  const fundingHistoryData = useAppSelector(
    (state) => state.fundingHistory.data
  );
  const selectedToken = useAppSelector((state) => state.token.selectedToken);
  const dispatch = useAppDispatch();

  const [availableExchanges, setAvailableExchanges] = useState<string[]>([]);
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTokens());
    dispatch(fetchMarket({}));
  }, [dispatch]);

  useEffect(() => {
    if (selectedToken) {
      dispatch(fetchFundingHistory(selectedToken));
    }
  }, [dispatch, selectedToken]);

  useEffect(() => {
    if (fundingHistoryData.length) {
      const exchanges = getUniqueExchanges(fundingHistoryData);
      setAvailableExchanges(exchanges);
      setSelectedExchanges(exchanges); // Initially select all exchanges
    }
  }, [fundingHistoryData]);

  // Set the initial filtered market data when market data is fetched
  useEffect(() => {
    setFilteredMarketData(marketData);
  }, [marketData]);

  const handleGoClick = () => {
    const filterParams = {
      token: selectedToken,
      exchanges: selectedExchanges,
      minimumFundingRate: parseFloat(minimumFundingRate),
    };

    dispatch(fetchMarket(filterParams));
  };

  const filterBasedOnExchanges = (
    markets: unknown[],
    exchanges: string
  ): unknown[] => {};

  return (
    <section className="text-white">
      <div className="w-full">
        <div className="py-5">
          <h1 className="text-3xl font-bold text-white">Funding Rates</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row w-full border border-white/20 py-4 rounded-[16px] mb-4 bg-gray-800 gap-4 px-4">
          <div className="grid grid-cols-12 w-full lg:gap-8 gap-4">
            <div className="col-span-full lg:col-span-4">
              <SearchInput
                label="Token"
                placeholder="Search/Enter Token: "
                options={tokensData}
                onOptionClick={(value) => dispatch(updateSelectedToken(value))}
              />
            </div>
            <div className="col-span-full lg:col-span-4 flex flex-col ">
              <label htmlFor="" className="mb-1">
                Minimum Funding Rate
              </label>
              <input
                type="text"
                value={minimumFundingRate}
                onChange={(evt) => setMinimumFundingRate(evt.target.value)}
                placeholder="Mininum funding rate. Eg: 10"
                className="bg-gray-900 py-4 rounded-lg p-2.5  border border-white/20  text-gray-400 font-bold"
              />
            </div>
            <div className="col-span-full lg:col-span-4 flex flex-col">
              <ExchangeSearchInput
                label="Exchange"
                options={availableExchanges}
                placeholder="Search/Enter Exchange:"
                onSelectionChange={(selectedOptions) =>
                  setSelectedExchanges(selectedOptions)
                }
              />
            </div>
          </div>
          <div className="mt-auto mb-1 mx-auto">
            <PrimaryButton
              buttonText="GO"
              buttonIcon={<GrNext />}
              onClick={handleGoClick}
            />
          </div>
        </div>

        <div className="grid grid-cols-10 gap-4">
          <div className="border col-span-full lg:col-span-3 rounded-[16px] bg-gray-800 border-white/20 h-fit overflow-hidden">
            <div className="py-5 px-4">
              <h3 className="text-white/90 font-bold text-base">
                Table results
              </h3>
            </div>
            <div className="overflow-x-auto text-black  h-[520px]">
              {marketDataLoading ? (
                <div className="text-center text-white flex h-full w-full pt-16 justify-center">
                  <Bars color="#FFF" />
                </div>
              ) : (
                <AppTable<TableItem>
                  tableHeadRowClassName=" "
                  columns={fundingRatesTableColumn}
                  data={filteredMarketData}
                />
              )}
            </div>
          </div>
          <div className=" col-span-full lg:col-span-5 rounded-lg flex flex-col gap-4">
            <div className="py-5 px-4  flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center border border-white/20">
              <h3 className="text-white/90 font-bold text-base">
                Funding history chart
              </h3>
              <div className="flex  items-center gap-2">
                <TimeFilter />
                <button className="text-white p-2 hover:bg-primary-dark rounded-full">
                  <AiOutlineExpandAlt size="1.4rem" />
                </button>
              </div>
            </div>

            <div className="border border-white/20 bg-gray-800 rounded-xl">
              <div className="px-3 py-5">
                <h2 className="text-white/90 text-xl text-black font-bold">
                  Price chart
                </h2>
              </div>

              <div className="">
                <PriceChart />
              </div>
            </div>
          </div>

          <div className="border col-span-full lg:col-span-2 rounded-[16px] bg-gray-800 border-white/20 h-fit overflow-hidden">
            <div className="py-5 px-4">
              <h3 className="text-white/90 font-bold text-base">Orderbook</h3>
            </div>
            <div className="overflow-x-auto text-black">
              <AppTable<OrderbookItem>
                columns={orderBookTableColumnnNegative}
                data={orderBookData}
              />
              <div className="my-3 text-center text-[#419E6A] font-bold text-base">
                <span>62,238.00 USDT</span>
              </div>
              <AppTable<OrderbookItem>
                columns={orderBookTableColumnPostive}
                tableHeadRowClassName="hidden"
                data={orderBookData}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingRates;
