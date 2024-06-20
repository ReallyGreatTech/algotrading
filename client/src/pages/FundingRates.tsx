import AppTable from '../components/AppTable';
import PrimaryButton from '../components/PrimaryButton';
import { GrNext } from 'react-icons/gr';
import { OrderbookItem, PriceChartDataItem } from '../types';
import {
  fundingRatesTableColumn,
  orderBookData,
  orderBookTableColumnPostive,
  orderBookTableColumnnNegative,
} from '../constants/data/fundingRatesPage';
import SearchInput from '../components/SearchInput';
import { useAppSelector, useAppDispatch } from '../hooks';
import { useEffect, useState } from 'react';
import {
  fetchTokens,
  updateSelectedToken,
} from '../redux/features/tokens/tokenSlice';
import { fetchFundingHistory } from '../redux/features/fundingHistory/fundingHistorySlice';
import { getUniqueExchanges } from '../utils/getUniqueExchanges';
import ExchangeSearchInput from '../components/ExchangeSearchInput';
import {
  FetchMarketParams,
  // fetchMarket,
  loadMarkets,
} from '../redux/features/market/marketSlice';
import TimeFilter from '../components/TimeFilter';
import { AiOutlineExpandAlt } from 'react-icons/ai';
// import PriceChart from "../components/PriceChart";
import { Bars } from 'react-loader-spinner';
import HistoryChart from '../components/Charts/HistoryChart';
// import HistoryChart from "../components/charts/HistoryChart";
import { formatTimestamp } from '../utils/formatTime';
import { fetchSelectedFundingHistory } from '../redux/features/selectedfundingHistory/selectedfundingHistorySlice';
import PriceChart from '../components/PriceChart';
import { fetchCryptoComparePrices } from '../utils/fetchCryptoPrices';

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
  origin_symbol: 'ORDIUSD';
  token: 'ORDI';
  exchange: 'hmx-arbitrum';
  created_at: '2024-06-08T14:10:28.732290';
  updated_at: '2024-06-14T10:02:11.347750';
}

const FundingRates = () => {
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
  const [priceChartData, setPriceChartData] = useState<PriceChartDataItem[]>(
    []
  );
  const selectedToken = useAppSelector((state) => state.token.selectedToken);
  const selectedTimeFilter = useAppSelector((state) => state.timefilter.time);
  const dispatch = useAppDispatch();

  const [availableExchanges, setAvailableExchanges] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTokens());

    dispatch(loadMarkets({}));
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
    dispatch(loadMarkets(getMarketParams()));
  };

  const getFundingData = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const yesterday = new Date(now.setDate(now.getDate() - 1))
      .toISOString()
      .split('T')[0];
    const twoDaysAgo = new Date(now.setDate(now.getDate() - 1))
      .toISOString()
      .split('T')[0];

    const filteredData = fundingData.filter((item) => {
      const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
      return (
        itemDate === today || itemDate === yesterday || itemDate === twoDaysAgo
      );
    });

    const transformedData = filteredData.map((item) => {
      const formattedTimestamp = formatTimestamp(item.timestamp);
      const itemDate = new Date(item.timestamp).toISOString().split('T')[0]; // Simplified date string for chart display
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
        timestamp: formattedTimestamp, // This is for display purposes elsewhere
        chartDate: itemDate, // This is for chart display
        funding,
      };
    });

    // Rotate the data array
    return transformedData.reverse();
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

  // console.log('SELECTED ROW RESPONSE DATA', fundingData);

  return (
    <section className="text-white">
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
            <div className="col-span-full lg:col-span-4 flex flex-col ">
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
                onSelectionChange={() => {
                  // setSelectedExchanges(selectedOptions)
                }}
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
            <div className="overflow-x-auto text-black  min-h-[520px] h-auto max-h-[120vh]">
              {marketDataLoading ? (
                <div className="text-center text-white flex h-full w-full pt-16 justify-center">
                  <Bars height={32} color="#FFF" />
                </div>
              ) : (
                <AppTable<Market>
                  selectedRow={selecetedRow}
                  columns={fundingRatesTableColumn}
                  data={filteredMarketData}
                  onRowClick={(item) => {
                    // console.log(item.token, item.exchange);
                    setSelectedRow(item);

                    dispatch(
                      fetchSelectedFundingHistory({
                        token: item.token,
                        exchange: item.exchange,
                      })
                    );

                    console.log('Calling api');
                    setPriceChartData([]);
                    fetchCryptoComparePrices(item.token, 30).then((prices) => {
                      setPriceChartData(prices);
                      console.log('API Call Ended');
                      console.log(prices);
                    });
                  }}
                />
              )}
            </div>
          </div>
          <div className=" col-span-full lg:col-span-5 rounded-lg flex flex-col gap-4">
            <div className="border border-white/20 bg-gray-800 rounded-xl">
              <div className="py-5 px-4  flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center">
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
              <div>
                {/* <HistoryChart data={data.map(item => ({
              timestamp: item.timestamp,
              funding: item.annual_funding // or item.daily_funding or item.annual_funding based on your need
            }))} /> */}

                <HistoryChart data={getFundingData()} />
              </div>
            </div>

            <div className="border border-white/20 bg-gray-800 rounded-xl">
              <div className="px-3 py-5">
                <h2 className="text-white/90 text-xl text-black font-bold">
                  Price chart
                </h2>
              </div>

              <div className="">
                <PriceChart data={priceChartData} />
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
