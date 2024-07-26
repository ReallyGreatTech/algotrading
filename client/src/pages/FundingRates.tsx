import AppTable from '../components/AppTable';
import PrimaryButton from '../components/PrimaryButton';
import { GrNext } from 'react-icons/gr';
import {
  FetchMarketParams,
  Market,
  // OrderbookItem,
  PriceChartDataItem,
} from '../types';
import {
  fundingHistoryTabs,
  fundingRatesTableColumn,
  // orderBookData,
  // orderBookTableColumnPostive,
  // orderBookTableColumnnNegative,
} from '../constants/data/fundingRatesPage';
import SearchInput from '../components/SearchInput';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useEffect, useRef, useState } from 'react';
import { updateSelectedToken } from '../redux/features/tokens/tokenSlice';
import { getUniqueExchanges } from '../utils/getUniqueExchanges';
import ExchangeSearchInput from '../components/ExchangeSearchInput';
import TimeFilter from '../components/TimeFilter';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import { Bars } from 'react-loader-spinner';
import HistoryChart from '../components/Charts/HistoryChart';
import { formatTimestamp } from '../utils/formatTime';
import { fetchCryptoComparePrices } from '../utils/fetchCryptoPrices';
import TradingViewChart from '../components/TradingViewChart';
import {
  fetchFundingHistory,
  fetchSelectedFundingHistory,
} from '../redux/api/fundingHistory';
import { fetchTokens } from '../redux/api/tokens';
import { fetchMarket } from '../redux/api/markets';
import { subDays, subYears, isAfter } from 'date-fns';
import Tabs from '../components/Tabs';
import MarketFilterBox from '../components/MarketFilterBox';

const FundingRates = () => {
  const [fundingHistoryTab, setFundingHistoryTab] = useState(
    fundingHistoryTabs[0]
  );
  const chartContainer = useRef<HTMLDivElement | null>(null);
  const [chartContainerHeight, setChartContainerHeight] = useState(5000);
  const [selecetedRow, setSelectedRow] = useState<Market | undefined>(
    undefined
  );
  const tokensData = useAppSelector((state) => state.token.tokens);
  const marketData = useAppSelector((state) => state.market.data);
  const marketDataLoading = useAppSelector((state) => state.market.loading);
  const [filteredMarketData, setFilteredMarketData] = useState(marketData);
  const [minimumFundingRate, setMinimumFundingRate] = useState<
    string | undefined
  >(undefined);
  const [fundingNormalization, setFundingNormalization] = useState<
    string | undefined
  >(undefined);
  const [minOpenInterestUsd, setMinOpenInterestUsd] = useState<
    string | undefined
  >(undefined);

  const fundingHistoryData = useAppSelector(
    (state) => state.fundingHistory.data
  );
  const [_, setPriceChartData] = useState<PriceChartDataItem[]>([]);
  const selectedToken = useAppSelector((state) => state.token.selectedToken);
  const selectedTimeFilter = useAppSelector((state) => state.timefilter.time);
  const localStorageMarketsData = useAppSelector(
    (state) => state.localStorageMarketData
  );

  const dispatch = useAppDispatch();

  const [availableExchanges, setAvailableExchanges] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState('1D');

  useEffect(() => {
   

    dispatch(fetchTokens());

    dispatch(fetchMarket({}));
  }, []);

  useEffect(() => {
    if (selectedToken) {
      dispatch(fetchFundingHistory(selectedToken));
    }
  }, [dispatch, selectedToken]);

  useEffect(() => {
    if (fundingHistoryData.length) {
      const exchanges = getUniqueExchanges(fundingHistoryData);
      setAvailableExchanges(exchanges);
    }
  }, [fundingHistoryData]);

  useEffect(() => {
    setFilteredMarketData(marketData);
  }, [marketData]);

  useEffect(() => {
    if (chartContainer.current?.offsetHeight)
      setChartContainerHeight(chartContainer.current?.offsetHeight);
  }, []);

  const getMarketParams = (): FetchMarketParams => {
    const filterParams: FetchMarketParams = {};

    if (selectedToken) filterParams.token = selectedToken;
    if (fundingNormalization)
      filterParams.funding_normalization = Number(fundingNormalization);
    if (minimumFundingRate)
      filterParams.annual_min_funding_rate = Number(minimumFundingRate);
    if (minOpenInterestUsd)
      filterParams.min_open_interest_usd = Number(minOpenInterestUsd);

    return filterParams;
  };

  const handleGoClick = () => {
    dispatch(fetchMarket(getMarketParams()));
  };

  const getFundingData = () => {
    const now = new Date();
    let startDate;

    switch (timeRange) {
      case '1D':
        startDate = subDays(now, 1);
        break;
      case '1W':
        startDate = subDays(now, 7);
        break;
      case '1Y':
        startDate = subYears(now, 1);
        break;
      default:
        startDate = subDays(now, 1);
    }

    const filteredData = fundingData.filter((item) => {
      // Directly create a Date object from the timestamp string
      const itemDate = new Date(item.timestamp);
      return isAfter(itemDate, startDate);
    });

    const transformedData = filteredData
      .map((item) => {
        const formattedTimestamp = formatTimestamp(item.timestamp);
        let funding;

        switch (selectedTimeFilter) {
          case '1H':
            funding = item.hourly_funding;
            break;
          case '1D':
            funding = item.daily_funding;
            break;
          case '1Y':
            funding = item.annual_funding;
            break;
          default:
            funding = item.annual_funding;
        }

        return {
          timestamp: formattedTimestamp,
          funding,
        };
      })
      .reverse(); // Ensure the data is sorted in descending order

    return transformedData;
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  const handleTestDispatch = () => {
    dispatch(
      fetchSelectedFundingHistory({
        token: 'TRUMP',
        exchange: 'rabbitx',
      })
    );
  };

  const fundingData = useAppSelector((state) => {
    return state.selecetedFundingHistory.data;
  });

  const getUnhiddenMarket = () => {
    const hidden = localStorageMarketsData.data.hidden;
    let data: Market[] = filteredMarketData;

    data = data.filter((m) => {
      const index = hidden.findIndex((hm) => hm.id === m.id);
      if (index == -1) return m;
    });

    return data;
  };

  return (
    <section className="text-white pb-10 ">
      <div className="w-full">
        <div className="py-5">
          <h1
            className="text-3xl font-bold text-white"
            onClick={handleTestDispatch}
          >
            Funding Rates
          </h1>
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
              <label htmlFor="" className="mb-1">
                Minimum Funding Rate
              </label>
              <input
                type="text"
                value={minimumFundingRate}
                onChange={(e) => setMinimumFundingRate(e.target.value)}
                placeholder="Mininum funding rate. Eg: 10"
                className="bg-gray-900 py-[0.9em] rounded-lg p-2.5  border border-white/20  text-gray-400 font-bold"
              />
            </div>
            <div className="col-span-full lg:col-span-4 flex flex-col ">
              <label htmlFor="" className="mb-1">
                Funding Normalization
              </label>
              <input
                type="text"
                value={fundingNormalization}
                onChange={(e) => setFundingNormalization(e.target.value)}
                placeholder="Funding Normalization. Eg: 5"
                className="bg-gray-900 py-[0.9em] rounded-lg p-2.5  border border-white/20  text-gray-400 font-bold"
              />
            </div>
            <div className="col-span-full lg:col-span-4 flex flex-col ">
              <label htmlFor="" className="mb-1">
                Minimum Open Interest USD
              </label>
              <input
                type="text"
                value={minOpenInterestUsd}
                onChange={(e) => setMinOpenInterestUsd(e.target.value)}
                placeholder="Minimum Open Interest USD. Eg: 5"
                className="bg-gray-900 py-[0.9em] rounded-lg p-2.5  border border-white/20  text-gray-400 font-bold"
              />
            </div>
            <div className="col-span-full lg:col-span-4 flex flex-col">
              <ExchangeSearchInput
                label="Exchange"
                options={availableExchanges}
                placeholder="Search/Enter Exchange:"
                onSelectionChange={() => {}}
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
              <h3 className="text-white/90 font-bold text-base mb-2">
                Table results
              </h3>

              <Tabs
                tabs={fundingHistoryTabs}
                activeTab={fundingHistoryTab}
                onChange={(tab) => {
                  setFundingHistoryTab(tab);
                }}
              />
              {localStorageMarketsData.filterToken && <MarketFilterBox />}
            </div>
            <div
              className="overflow-x-auto text-black  min-h-[520px] h-auto max-h-[1000px]"
              style={{ height: chartContainerHeight + 100 }}
            >
              {marketDataLoading ? (
                <div className="text-center text-white flex h-full w-full pt-16 justify-center opacity-70">
                  <Bars height={20} color="#FFF" />
                </div>
              ) : (
                <AppTable<Market>
                  selectedRow={selecetedRow}
                  columns={fundingRatesTableColumn}
                  data={
                    fundingHistoryTab.label === "Favorite"
                      ? localStorageMarketsData.data.favourites
                      : fundingHistoryTab.label === "Hidden"
                      ? localStorageMarketsData.data.hidden
                      : getUnhiddenMarket()
                  }
                  onRowClick={(item) => {
                    setSelectedRow(item);

                    dispatch(
                      fetchSelectedFundingHistory({
                        token: item.token,
                        exchange: item.exchange,
                      })
                    );

                    setPriceChartData([]);
                    fetchCryptoComparePrices(item.token, 30).then((prices) => {
                      setPriceChartData(prices);
                    });
                  }}
                />
              )}
            </div>
          </div>

          <div
            className=" col-span-full lg:col-span-5 rounded-lg flex flex-col gap-4"
            ref={chartContainer}
          >
            <div className="border border-white/20 bg-gray-800 rounded-xl">
              <div className="py-5 px-4  flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center">
                <h3 className="text-white/90 font-bold text-base">
                  Funding history chart
                </h3>
                <div className="flex  items-center gap-2">
                  <TimeFilter />
                  <div className="text-white/40 pl-2 border-l-white/40 border-l-[1px]">
                    Timelines:
                  </div>
                  <select
                    value={timeRange}
                    // onChange={(e) => setTimeRange(e.target.value)}
                    onChange={(e) => handleTimeRangeChange(e.target.value)}
                    className="bg-gray-800 text-white border border-white/20 rounded-md p-1"
                  >
                    <option value="1D">1 Day</option>
                    <option value="1W">1 Week</option>
                    <option value="1Y">1 Year</option>
                  </select>

                  <button className="text-white p-2 hover:bg-primary-dark rounded-full">
                    <AiOutlineExpandAlt size="1.4rem" />
                  </button>
                </div>
              </div>
              <div>
                {/* <HistoryChart data={getFundingData()} /> */}
                <HistoryChart data={getFundingData()} timeRange={timeRange} />
              </div>
            </div>

            <div className="border border-white/20 bg-gray-800 rounded-xl">
              <div className="px-3 py-5">
                <h2 className="text-white/90 text-xl text-black font-bold">
                  Price chart
                </h2>
              </div>

              <div className="h-[500px]">
                <TradingViewChart />
              </div>
            </div>
          </div>

          <div className="border col-span-full lg:col-span-2 rounded-[16px] bg-gray-800 border-white/20 h-fit overflow-hidden">
            <div className="py-5 px-4">
              <h3 className="text-white/90 font-bold text-base">Filtered Results</h3>
            </div>

            <div
              className="overflow-x-auto text-black  min-h-[520px] h-auto max-h-[1000px]"
              style={{ height: chartContainerHeight + 100 }}
            >
              {/* <div className="overflow-x-auto text-black">
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
            </div>  */}
               <AppTable<Market>
              selectedRow={selecetedRow}
              columns={fundingRatesTableColumn}
              data={
                fundingHistoryTab.label === "Favorite"
                  ? localStorageMarketsData.data.favourites
                  : fundingHistoryTab.label === "Hidden"
                  ? localStorageMarketsData.data.hidden
                  : getUnhiddenMarket()
              }
              onRowClick={(item) => {
                setSelectedRow(item);

                dispatch(
                  fetchSelectedFundingHistory({
                    token: item.token,
                    exchange: item.exchange,
                  })
                );

                setPriceChartData([]);
                fetchCryptoComparePrices(item.token, 30).then((prices) => {
                  setPriceChartData(prices);
                });
              }}
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingRates;
