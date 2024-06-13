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
import FilterInput from "../components/FilterInput";
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

const FundingRates = () => {
  const tokensData = useAppSelector((state) => state.token.tokens);
  const marketData = useAppSelector((state) => state.market.data);
  const [filteredMarketData, setFilteredMarketData] = useState(marketData);
  const fundingHistoryData = useAppSelector(
    (state) => state.fundingHistory.data
  );
  const selectedToken = useAppSelector((state) => state.token.selectedToken);
  const dispatch = useAppDispatch();

  const [availableExchanges, setAvailableExchanges] = useState<string[]>([]);
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTokens());
    dispatch(fetchMarket());
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
    };
    console.log("Filter Params:", filterParams);

    // Filter the market data based on the selected token and exchanges
    const filteredData = marketData.filter((item: any) => {
      const matchesToken =
        !filterParams.token || item.token === filterParams.token;
      const matchesExchange = filterParams.exchanges.includes(item.exchange);
      return matchesToken && matchesExchange;
    });

    setFilteredMarketData(filteredData);
  };

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
            <div className="col-span-full lg:col-span-4 flex flex-col">
              <FilterInput label="Minimum funding rate" />
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
              <AppTable<TableItem>
                tableHeadRowClassName=" "
                columns={fundingRatesTableColumn}
                data={filteredMarketData}
              />
            </div>
          </div>
          <div className="border col-span-full lg:col-span-5 rounded-lg flex flex-col gap-4 border-white/20">
            <div className="py-5 px-4 border flex justify-between items-center">
              <h3 className="text-white/90 font-bold text-base">
                Funding history chart
              </h3>
              <div className="flex  items-center gap-2">
                <TimeFilter />
                <button
                  className="text-white p-2 hover:bg-primary-dark rounded-full"
                
                >
                  <AiOutlineExpandAlt size="1.4rem"/>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-center text-black font-bold">
                Price chart (from selected row in table)
              </h2>
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
