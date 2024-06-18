import AppTable from "../components/AppTable";
import PrimaryButton from "../components/PrimaryButton";
import { GrNext } from "react-icons/gr";
import { OrderbookItem } from "../types";
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
import {
  FetchMarketParams,
  // fetchMarket,
  loadMarkets,
} from "../redux/features/market/marketSlice";
import TimeFilter from "../components/TimeFilter";
import { AiOutlineExpandAlt } from "react-icons/ai";
// import PriceChart from "../components/PriceChart";
import { Bars } from "react-loader-spinner";
import HistoryChart from "../components/Charts/HistoryChart";
import { formatTimestamp } from "../utils/formatTime";
import { fetchSelectedFundingHistory } from "../redux/features/selectedfundingHistory/selectedfundingHistorySlice";

// const fundingData = [
//   {
//     id: 81841,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000583194,
//     hourly_funding: 0.0058319377,
//     daily_funding: 0.1399665037,
//     annual_funding: 51.087774252,
//     timestamp: "2024-06-14T15:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 81505,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000577317,
//     hourly_funding: 0.0057731727,
//     daily_funding: 0.1385561438,
//     annual_funding: 50.572992852,
//     timestamp: "2024-06-14T14:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 81116,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000756382,
//     hourly_funding: 0.0075638168,
//     daily_funding: 0.1815316035,
//     annual_funding: 66.259035168,
//     timestamp: "2024-06-14T13:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 80723,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000168745,
//     hourly_funding: 0.0016874541,
//     daily_funding: 0.0404988988,
//     annual_funding: 14.782097916,
//     timestamp: "2024-06-14T12:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 80310,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: -0.0003608148,
//     hourly_funding: -0.0360814789,
//     daily_funding: -0.8659554943,
//     annual_funding: -316.073755164,
//     timestamp: "2024-06-14T11:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 80311,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000622362,
//     hourly_funding: 0.0062236194,
//     daily_funding: 0.1493668666,
//     annual_funding: 54.518905944,
//     timestamp: "2024-06-14T10:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 79595,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000455733,
//     hourly_funding: 0.0045573337,
//     daily_funding: 0.1093760076,
//     annual_funding: 39.922243212,
//     timestamp: "2024-06-14T09:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 79123,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000412699,
//     hourly_funding: 0.004126991,
//     daily_funding: 0.099047785,
//     annual_funding: 36.15244116,
//     timestamp: "2024-06-14T08:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 78790,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000399405,
//     hourly_funding: 0.0039940536,
//     daily_funding: 0.0958572874,
//     annual_funding: 34.987909536,
//     timestamp: "2024-06-14T07:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 78467,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000407709,
//     hourly_funding: 0.0040770945,
//     daily_funding: 0.0978502674,
//     annual_funding: 35.71534782,
//     timestamp: "2024-06-14T06:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 78090,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000579128,
//     hourly_funding: 0.0057912828,
//     daily_funding: 0.1389907874,
//     annual_funding: 50.731637328,
//     timestamp: "2024-06-14T05:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 77713,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000462111,
//     hourly_funding: 0.0046211114,
//     daily_funding: 0.1109066729,
//     annual_funding: 40.480935864,
//     timestamp: "2024-06-14T04:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 77314,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000610474,
//     hourly_funding: 0.0061047367,
//     daily_funding: 0.1465136817,
//     annual_funding: 53.477493492,
//     timestamp: "2024-06-14T03:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 76954,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.000053011,
//     hourly_funding: 0.005301102,
//     daily_funding: 0.1272264491,
//     annual_funding: 46.43765352,
//     timestamp: "2024-06-14T02:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 76576,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000471947,
//     hourly_funding: 0.0047194692,
//     daily_funding: 0.1132672609,
//     annual_funding: 41.342550192,
//     timestamp: "2024-06-14T01:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 76199,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000494238,
//     hourly_funding: 0.0049423787,
//     daily_funding: 0.1186170889,
//     annual_funding: 43.295237412,
//     timestamp: "2024-06-14T00:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 75821,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000653626,
//     hourly_funding: 0.0065362648,
//     daily_funding: 0.1568703541,
//     annual_funding: 57.257679648,
//     timestamp: "2024-06-13T23:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 75443,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000582774,
//     hourly_funding: 0.005827739,
//     daily_funding: 0.1398657362,
//     annual_funding: 51.05099364,
//     timestamp: "2024-06-13T22:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 75066,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000499717,
//     hourly_funding: 0.0049971656,
//     daily_funding: 0.1199319734,
//     annual_funding: 43.775170656,
//     timestamp: "2024-06-13T21:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 74689,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000384872,
//     hourly_funding: 0.0038487152,
//     daily_funding: 0.0923691652,
//     annual_funding: 33.714745152,
//     timestamp: "2024-06-13T20:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 74310,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000370759,
//     hourly_funding: 0.0037075935,
//     daily_funding: 0.0889822449,
//     annual_funding: 32.47851906,
//     timestamp: "2024-06-13T19:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 73932,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000606611,
//     hourly_funding: 0.0060661149,
//     daily_funding: 0.1455867572,
//     annual_funding: 53.139166524,
//     timestamp: "2024-06-13T18:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 73086,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000443813,
//     hourly_funding: 0.0044381333,
//     daily_funding: 0.1065151986,
//     annual_funding: 38.878047708,
//     timestamp: "2024-06-13T17:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 73038,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.000043498,
//     hourly_funding: 0.0043498043,
//     daily_funding: 0.1043953021,
//     annual_funding: 38.104285668,
//     timestamp: "2024-06-13T16:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 72595,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000194426,
//     hourly_funding: 0.0019442633,
//     daily_funding: 0.0466623185,
//     annual_funding: 17.031746508,
//     timestamp: "2024-06-13T15:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 72283,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.000035946,
//     hourly_funding: 0.0035946007,
//     daily_funding: 0.0862704158,
//     annual_funding: 31.488702132,
//     timestamp: "2024-06-13T14:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 71904,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000289359,
//     hourly_funding: 0.0028935858,
//     daily_funding: 0.0694460592,
//     annual_funding: 25.347811608,
//     timestamp: "2024-06-13T13:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 71498,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000300132,
//     hourly_funding: 0.0030013237,
//     daily_funding: 0.0720317677,
//     annual_funding: 26.291595612,
//     timestamp: "2024-06-13T12:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 71148,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000331105,
//     hourly_funding: 0.0033110474,
//     daily_funding: 0.0794651388,
//     annual_funding: 29.004775224,
//     timestamp: "2024-06-13T11:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 70750,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000403343,
//     hourly_funding: 0.0040334348,
//     daily_funding: 0.0968024351,
//     annual_funding: 35.332888848,
//     timestamp: "2024-06-13T10:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 70398,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000411151,
//     hourly_funding: 0.0041115127,
//     daily_funding: 0.0986763049,
//     annual_funding: 36.016851252,
//     timestamp: "2024-06-13T09:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 70011,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000523741,
//     hourly_funding: 0.0052374072,
//     daily_funding: 0.1256977729,
//     annual_funding: 45.879687072,
//     timestamp: "2024-06-13T08:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 69641,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000401554,
//     hourly_funding: 0.0040155408,
//     daily_funding: 0.09637298,
//     annual_funding: 35.176137408,
//     timestamp: "2024-06-13T07:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 69270,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000448932,
//     hourly_funding: 0.0044893216,
//     daily_funding: 0.1077437193,
//     annual_funding: 39.326457216,
//     timestamp: "2024-06-13T06:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 68887,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000394807,
//     hourly_funding: 0.0039480681,
//     daily_funding: 0.0947536335,
//     annual_funding: 34.585076556,
//     timestamp: "2024-06-13T05:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 68522,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000245713,
//     hourly_funding: 0.0024571333,
//     daily_funding: 0.0589711983,
//     annual_funding: 21.524487708,
//     timestamp: "2024-06-13T04:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 68133,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000231106,
//     hourly_funding: 0.0023110635,
//     daily_funding: 0.0554655243,
//     annual_funding: 20.24491626,
//     timestamp: "2024-06-13T03:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 67769,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000234957,
//     hourly_funding: 0.0023495675,
//     daily_funding: 0.05638962,
//     annual_funding: 20.5822113,
//     timestamp: "2024-06-13T02:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 67397,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000349857,
//     hourly_funding: 0.0034985716,
//     daily_funding: 0.083965718,
//     annual_funding: 30.647487216,
//     timestamp: "2024-06-13T01:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 67023,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.000044409,
//     hourly_funding: 0.0044408951,
//     daily_funding: 0.1065814821,
//     annual_funding: 38.902241076,
//     timestamp: "2024-06-13T00:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 66647,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000547491,
//     hourly_funding: 0.0054749139,
//     daily_funding: 0.1313979331,
//     annual_funding: 47.960245764,
//     timestamp: "2024-06-12T23:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 66273,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000425047,
//     hourly_funding: 0.004250474,
//     daily_funding: 0.1020113753,
//     annual_funding: 37.23415224,
//     timestamp: "2024-06-12T22:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 65898,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.000034885,
//     hourly_funding: 0.0034885045,
//     daily_funding: 0.0837241088,
//     annual_funding: 30.55929942,
//     timestamp: "2024-06-12T21:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 65522,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000241585,
//     hourly_funding: 0.0024158549,
//     daily_funding: 0.0579805169,
//     annual_funding: 21.162888924,
//     timestamp: "2024-06-12T20:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 65146,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: -0.0000051005,
//     hourly_funding: -0.000510053,
//     daily_funding: -0.0122412727,
//     annual_funding: -4.46806428,
//     timestamp: "2024-06-12T19:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 64771,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000446518,
//     hourly_funding: 0.0044651767,
//     daily_funding: 0.1071642405,
//     annual_funding: 39.114947892,
//     timestamp: "2024-06-12T18:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 64395,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000258535,
//     hourly_funding: 0.0025853465,
//     daily_funding: 0.0620483155,
//     annual_funding: 22.64763534,
//     timestamp: "2024-06-12T17:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 64022,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000139729,
//     hourly_funding: 0.0013972854,
//     daily_funding: 0.0335348491,
//     annual_funding: 12.240220104,
//     timestamp: "2024-06-12T16:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 63646,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000284776,
//     hourly_funding: 0.0028477594,
//     daily_funding: 0.0683462264,
//     annual_funding: 24.946372344,
//     timestamp: "2024-06-12T15:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 63272,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000417687,
//     hourly_funding: 0.004176872,
//     daily_funding: 0.1002449285,
//     annual_funding: 36.58939872,
//     timestamp: "2024-06-12T14:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 62897,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000190828,
//     hourly_funding: 0.0019082841,
//     daily_funding: 0.0457988175,
//     annual_funding: 16.716568716,
//     timestamp: "2024-06-12T13:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 62520,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000355715,
//     hourly_funding: 0.0035571521,
//     daily_funding: 0.0853716516,
//     annual_funding: 31.160652396,
//     timestamp: "2024-06-12T12:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 62103,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000263331,
//     hourly_funding: 0.0026333135,
//     daily_funding: 0.0631995245,
//     annual_funding: 23.06782626,
//     timestamp: "2024-06-12T11:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 61726,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000466664,
//     hourly_funding: 0.0046666353,
//     daily_funding: 0.1119992471,
//     annual_funding: 40.879725228,
//     timestamp: "2024-06-12T10:00:00",
//     trading_pair: 323,
//   },
//   {
//     id: 61354,
//     exchange: "rabbitx",
//     token: "BTC",
//     origin_funding: 0.0000250438,
//     hourly_funding: 0.0025043783,
//     daily_funding: 0.0601050789,
//     annual_funding: 21.938353908,
//     timestamp: "2024-06-12T09:00:00",
//     trading_pair: 323,
//   },
//   // Add the rest of your data here
// ];

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
  // const { data } = useAppSelector((state) => state.fundingHistory);
  const selectedToken = useAppSelector((state) => state.token.selectedToken);
  const selectedTimeFilter = useAppSelector((state) => state.timefilter.time);
  const dispatch = useAppDispatch();

  const [availableExchanges, setAvailableExchanges] = useState<string[]>([]);
  // const [selectedExchanges, setSelectedExchanges] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTokens());
    // dispatch(fetchMarket(getMarketParams()));
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
      // setSelectedExchanges(exchanges); // Initially select all exchanges
    }
  }, [fundingHistoryData]);

  // Set the initial filtered market data when market data is fetched
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

  // const filterBasedOnExchanges = (
  //   markets: unknown[],
  //   exchanges: string
  // ): unknown[] => {};

  // commented out unused variables

  // const getFundingData = () => {
  //   switch (selectedTimeFilter) {
  //     case '1H':
  //       return fundingHistoryData.map(item => ({
  //         timestamp: item.timestamp,
  //         funding: item.daily_funding,
  //       }));
  //     case '1D':
  //       return fundingHistoryData.map(item => ({
  //         timestamp: item.timestamp,
  //         funding: item.weekly_funding,
  //       }));
  //     case '1Y':
  //       return fundingHistoryData.map(item => ({
  //         timestamp: item.timestamp,
  //         funding: item.monthly_funding,
  //       }));
  //     default:
  //       return fundingHistoryData.map(item => ({
  //         timestamp: item.timestamp,
  //         funding: item.annual_funding,
  //       }));
  //   }}
  const getFundingData = () => {
    switch (selectedTimeFilter) {
      case "1H":
        return fundingData.map((item) => ({
          timestamp: formatTimestamp(item.timestamp),
          funding: item.hourly_funding,
        }));
      case "1D":
        return fundingData.map((item) => ({
          timestamp: formatTimestamp(item.timestamp),
          funding: item.daily_funding,
        }));
      case "1Y":
        return fundingData.map((item) => ({
          timestamp: formatTimestamp(item.timestamp),
          funding: item.annual_funding,
        }));
      default:
        return fundingData.map((item) => ({
          timestamp: formatTimestamp(item.timestamp),
          funding: item.annual_funding,
        }));
    }
  };
  // const getFundingData = () => {
  //   console.log('history data:',data)
  //   switch (selectedTimeFilter) {
  //     case '1H':
  //       return data.map(item => ({
  //         timestamp: formatTimestamp(item.timestamp),
  //         funding: item.hourly_funding,
  //       }));
  //     case '1D':
  //       return data.map(item => ({
  //         timestamp: formatTimestamp(item.timestamp),
  //         funding: item.daily_funding,
  //       }));
  //     case '1Y':
  //       return data.map(item => ({
  //         timestamp: formatTimestamp(item.timestamp),
  //         funding: item.annual_funding,
  //       }));
  //     default:
  //       return data.map(item => ({
  //         timestamp: formatTimestamp(item.timestamp),
  //         funding: item.annual_funding,
  //       }));
  //   }}

  const handleTestDispatch = () => {
    dispatch(
      fetchSelectedFundingHistory({
        token: "TRUMP",
        exchange: "rabbitx",
      })
    );
  };

  const fundingData = useAppSelector((state) => {
    return state.selecetedFundingHistory.data;
  });

  console.log("SELECTED ROW RESPONSE DATA", fundingData);

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
            <div className="overflow-x-auto text-black  h-[520px]">
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
                    console.log(item.token, item.exchange);
                    setSelectedRow(item);
                    dispatch(
                      fetchSelectedFundingHistory({
                        token: item.token,
                        exchange: item.exchange,
                      })
                    );
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
            {/* 
            <div className="border border-white/20 bg-gray-800 rounded-xl">
              <div className="px-3 py-5">
                <h2 className="text-white/90 text-xl text-black font-bold">
                  Price chart
                </h2>
              </div>

              <div className="">
                <PriceChart />
              </div>
            </div> */}
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
