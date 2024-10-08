import AppTable from '../components/AppTable';
import PrimaryButton from '../components/PrimaryButton';
import { GrNext } from 'react-icons/gr';
import { FetchMarketParams, Market, PriceChartDataItem } from '../types';
import {
  filteredFundingRateColumns,
  fundingHistoryTabs,
  fundingRatesTableColumn,
} from '../constants/data/fundingRatesPage';
import SearchInput from '../components/SearchInput';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { updateSelectedToken } from '../redux/features/tokens/tokenSlice';
import TimeFilter from '../components/TimeFilter';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import { Bars } from 'react-loader-spinner';
import { formatTimestamp } from '../utils/formatTime';
import { fetchCryptoComparePrices } from '../utils/fetchCryptoPrices';
import TradingViewChart from '../components/TradingViewChart';
import { fetchSelectedFundingHistory } from '../redux/api/fundingHistory';
import { fetchMarket } from '../redux/api/markets';
import { subDays, subYears, isAfter } from 'date-fns';
import Tabs from '../components/Tabs';
import MarketFilterBox from '../components/MarketFilterBox';
import { getDateTime } from '../utils/dateUtils';
import usePreLoadData from '../hooks/usePreLoadData';
import FundingHistoryChart from '../components/Charts/FundingHistoryChart';
import { updateTimeRange } from '../redux/features/timeFilter/timeFilter';


const FundingRates = () => {
  const [fundingHistoryTab, setFundingHistoryTab] = useState(
    fundingHistoryTabs[0]
  );
  const chartContainer = useRef<HTMLDivElement | null>(null);
  const [chartContainerHeight, setChartContainerHeight] = useState(5000);
  const [selectedMarketRow, setSelectedRow] = useState<Market | undefined>(
    undefined
  );

  const marketData = useAppSelector((state) => state.market.data);
  const marketDataLoading = useAppSelector((state) => state.market.loading);
  const [filteredMarketData, setFilteredMarketData] =
    useState<Market[]>(marketData);
  const [minimumFundingRate, setMinimumFundingRate] = useState<
    string | undefined
  >(undefined);
  const [fundingNormalization, setFundingNormalization] = useState<
    string | undefined
  >(undefined);
  const [selectedExchange, setSelectedExchange] = useState<string | undefined>(
    undefined
  );
  const [minOpenInterestUsd, setMinOpenInterestUsd] = useState<
    string | undefined
  >(undefined);
  const [showPageContent, setShowPageContent] = useState(false);
  const [_, setPriceChartData] = useState<PriceChartDataItem[]>([]);
  const selectedToken = useAppSelector((state) => state.token.selectedToken);
  const selectedTimeFilter = useAppSelector((state) => state.timefilter.time);
  const localStorageMarketsData = useAppSelector(
    (state) => state.localStorageMarketData
  );

  const dispatch = useAppDispatch();

  const [timeRange, setTimeRange] = useState('');
  const { tokens, exchanges } = usePreLoadData();

  const range = getDateTime(timeRange);

  const [sortColumn, setSortColumn] = useState<keyof Market | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const getUnhiddenMarket = useCallback(() => {
    const hidden = localStorageMarketsData.data.hidden;
    return filteredMarketData.filter((m) => !hidden.some((hm) => hm.id === m.id));
  }, [filteredMarketData, localStorageMarketsData.data.hidden]);

  const getUnsortedTableData = useCallback(() => {
    switch (fundingHistoryTab.label) {
      case 'Favorite':
        return localStorageMarketsData.data.favourites;
      case 'Hidden':
        return localStorageMarketsData.data.hidden;
      default:
        return getUnhiddenMarket();
    }
  }, [fundingHistoryTab.label, localStorageMarketsData.data, getUnhiddenMarket]);

  const sortedData = useMemo(() => {
    const dataToSort = getUnsortedTableData();
    if (!sortColumn) return dataToSort;

    return [...dataToSort].sort((a, b) => {
      const column = fundingRatesTableColumn.find(col => col.value === sortColumn);
      if (column && column.sortFunction) {
        return sortDirection === 'asc' 
          ? column.sortFunction(a, b) 
          : column.sortFunction(b, a);
      }

      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue == null || bValue == null) return 0;
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [getUnsortedTableData, sortColumn, sortDirection]);

  const handleSort = (column: keyof Market) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

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
    if (selectedExchange) filterParams.exchange = selectedExchange;
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
    setShowPageContent(true);
    resetFilters();
    setFilterKey(filterKey + 1); //
  };

  const resetFilters = () => {
    setMinimumFundingRate(undefined);
    setFundingNormalization(undefined);
    setSelectedExchange(undefined);
    setMinOpenInterestUsd(undefined);
    dispatch(updateSelectedToken(undefined));
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
    dispatch(updateTimeRange(range));
  };

  const fundingData = useAppSelector((state) => {
    return state.selecetedFundingHistory.data;
  });

  const marketsFilterByToken = useMemo((): Market[] => {
    if (!selectedMarketRow) return [];

    return filteredMarketData.filter(
      (m) => m.token === selectedMarketRow.token
    );
  }, [selectedMarketRow,filteredMarketData]);

  const [filterKey, setFilterKey] = useState(0); // Add this state to manage key updates

  return (
    <section className="text-white pb-10 ">
      <div className="w-full">
        <div className="py-5">
          <h1 className="text-3xl font-bold text-white">Funding Rates</h1>
        </div>

        {/* Filters */}
        <div>
          <div className="flex flex-col lg:flex-row w-full border border-white/20 py-4 rounded-[16px] mb-4 bg-gray-800 gap-4 px-4">
            <div className="grid grid-cols-12 w-full lg:gap-8 gap-4">
              <div className="col-span-full lg:col-span-4 z-50">
                <SearchInput
                  key={`token-${filterKey}`} // Add key here
                  label="Token"
                  placeholder="Search/Enter Token: "
                  options={tokens.data}
                  disabled={tokens.loading}
                  onOptionClick={(value) =>
                    dispatch(updateSelectedToken(value))
                  }
                />
                {exchanges.loading && (
                  <p className="text-[10px]">loading tokens...</p>
                )}
              </div>
              <div className="col-span-full lg:col-span-4 flex flex-col">
                <label htmlFor="" className="mb-1">
                  Minimum Funding Rate
                </label>
                <input
                  key={`minFundingRate-${filterKey}`} // Add key here
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
                  key={`fundingNormalization-${filterKey}`} // Add key here
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
                  key={`minOpenInterestUsd-${filterKey}`} // Add key here
                  type="text"
                  value={minOpenInterestUsd}
                  onChange={(e) => setMinOpenInterestUsd(e.target.value)}
                  placeholder="Minimum Open Interest USD. Eg: 5"
                  className="bg-gray-900 py-[0.9em] rounded-lg p-2.5  border border-white/20  text-gray-400 font-bold"
                />
              </div>
              <div className="col-span-full lg:col-span-4 flex flex-col z-50">
                <SearchInput
                  key={`exchange-${filterKey}`} // Add key here
                  label="Exchange"
                  placeholder="Search Exchange"
                  options={exchanges.data}
                  disabled={exchanges.loading}
                  onOptionClick={(value) => setSelectedExchange(value)}
                />
                {exchanges.loading && (
                  <p className="text-[10px]">loading exchanges...</p>
                )}
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
        </div>

        {showPageContent ? (
          <div className="grid grid-cols-10 gap-4">
            <div className="border col-span-full lg:col-span-3 rounded-[16px] bg-gray-800 border-white/20 h-fit overflow-hidden">
              <div className="py-5 px-4">
                <h3 className="text-white/90 font-bold text-base mb-2">
                  Table results
                </h3>
              </div>
              <div className="text-white/90 -z-10">
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
                    selectedRow={selectedMarketRow}
                    columns={fundingRatesTableColumn}
                    data={sortedData}
                    onSort={handleSort}
                    onRowClick={(item) => {
                      setSelectedRow(item);

                      dispatch(
                        fetchSelectedFundingHistory({
                          token: item.token,
                          exchange: item.exchange,
                          from_datetime: range,
                        })
                      );

                      setPriceChartData([]);
                      fetchCryptoComparePrices(item.token, 30).then(
                        (prices) => {
                          setPriceChartData(prices);
                        }
                      );
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
                  {/* <HistoryChart data={getFundingData()} timeRange={timeRange} /> */}
                  {/* <HistoryChart data={getFundingData()} timeRange={timeRange} /> */}
                  {/* <HistoryChart data={getFundingData()} timeRange={timeRange} /> */}
                  <div>
                    <FundingHistoryChart />
                    <button
                      className="hidden"
                      onClick={() => getFundingData()}
                    ></button>
                  </div>
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
                <h3 className="text-white/90 font-bold text-base">
                  Filtered Results{' '}
                  {selectedMarketRow ? `- ${selectedMarketRow?.token}` : ''}
                </h3>
              </div>

              <div
                className="overflow-x-auto text-black  min-h-[520px] h-auto max-h-[1000px]"
                style={{ height: chartContainerHeight + 100 }}
              >
                <AppTable<Market>
                  selectedRow={selectedMarketRow}
                  columns={filteredFundingRateColumns}
                  data={marketsFilterByToken}
                  onRowClick={(item) => {
                    setSelectedRow(item);

                    dispatch(
                      fetchSelectedFundingHistory({
                        token: item.token,
                        exchange: item.exchange,
                        from_datetime: range,
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
        ) : (
          <div className="text-2xl w-full py-[10rem] flex items-center justify-center opacity-50">
            Please input a search query and click GO to get started
          </div>
        )}
      </div>
    </section>
  );
};

export default FundingRates;
