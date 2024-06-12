import AppTable from "../components/AppTable";
import PrimaryButton from "../components/PrimaryButton";
import { GrNext } from "react-icons/gr";
import { OrderbookItem, TableItem } from "../types";
import {
  fundingRatesTableColumn,
  fundingRatesTableSampleData,
  orderBookData,
  orderBookTableColumnPostive,
  orderBookTableColumnnNegative,
} from "../constants/data/fundingRatesPage";
import SearchInput from "../components/SearchInput";
import FilterInput from "../components/FilterInput";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useEffect } from "react";
import { fetchTokens } from "../redux/features/tokens/tokenSlice";
import axios from "axios";
// import { updateTokens } from "../redux/features/tokens/tokenSlice";

const FundingRates = () => {
  // const token = "BTC";

  // interface ParamsType {
  //   token?: string;
  //   minimumFundingRate?: number 
  //   exchanges?: string[];
  // }

  // const params: ParamsType = {
  //   token: "BTC",
  // };

  // const fetchAllTokenInfo = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://3.76.134.149:8000/api/funding-history",
  //       {
  //         params,
  //       }
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };



  // const  results= [
  //   {
  //     "id": 61729,
  //     "exchange": "hmx-arbitrum",
  //     "token": "BTC",
  //     "origin_funding": 0.0053177962,
  //     "hourly_funding": 0.0053177962,
  //     "daily_funding": 0.1276271095,
  //     "annual_funding": 46.583894712,
  //     "timestamp": "2024-06-12T11:00:05.511304",
  //     "trading_pair": 179
  //   },
  //   {
  //     "id": 61737,
  //     "exchange": "oxfun",
  //     "token": "BTC",
  //     "origin_funding": 0.00008,
  //     "hourly_funding": 0.00008,
  //     "daily_funding": 0.00192,
  //     "annual_funding": 0.7008,
  //     "timestamp": "2024-06-12T11:00:00.552000",
  //     "trading_pair": 245
  //   },
  //   {
  //     "id": 61735,
  //     "exchange": "hyperliquid",
  //     "token": "BTC",
  //     "origin_funding": 0.00004614,
  //     "hourly_funding": 0.004614,
  //     "daily_funding": 0.110736,
  //     "annual_funding": 40.41864,
  //     "timestamp": "2024-06-12T11:00:00.073000",
  //     "trading_pair": 1
  //   },
  //   {
  //     "id": 62008,
  //     "exchange": "aevo",
  //     "token": "BTC",
  //     "origin_funding": 0.000006,
  //     "hourly_funding": 0.0006,
  //     "daily_funding": 0.0144,
  //     "annual_funding": 5.256,
  //     "timestamp": "2024-06-12T11:00:00",
  //     "trading_pair": 131
  //   },
  //   {
  //     "id": 61356,
  //     "exchange": "hmx-arbitrum",
  //     "token": "BTC",
  //     "origin_funding": 0.0052644821,
  //     "hourly_funding": 0.0052644821,
  //     "daily_funding": 0.1263475707,
  //     "annual_funding": 46.116863196,
  //     "timestamp": "2024-06-12T10:00:03.483235",
  //     "trading_pair": 179
  //   },
  //   {
  //     "id": 61362,
  //     "exchange": "oxfun",
  //     "token": "BTC",
  //     "origin_funding": 0.00008,
  //     "hourly_funding": 0.00008,
  //     "daily_funding": 0.00192,
  //     "annual_funding": 0.7008,
  //     "timestamp": "2024-06-12T10:00:00.712000",
  //     "trading_pair": 245
  //   },
  //   {
  //     "id": 61361,
  //     "exchange": "hyperliquid",
  //     "token": "BTC",
  //     "origin_funding": 0.00003121,
  //     "hourly_funding": 0.003121,
  //     "daily_funding": 0.074904,
  //     "annual_funding": 27.33996,
  //     "timestamp": "2024-06-12T10:00:00.036000",
  //     "trading_pair": 1
  //   },
  //   {
  //     "id": 61683,
  //     "exchange": "aevo",
  //     "token": "BTC",
  //     "origin_funding": 0.000054,
  //     "hourly_funding": 0.0054,
  //     "daily_funding": 0.1296,
  //     "annual_funding": 47.304,
  //     "timestamp": "2024-06-12T10:00:00",
  //     "trading_pair": 131
  //   },
  //   {
  //     "id": 61726,
  //     "exchange": "rabbitx",
  //     "token": "BTC",
  //     "origin_funding": 0.0000466664,
  //     "hourly_funding": 0.0046666353,
  //     "daily_funding": 0.1119992471,
  //     "annual_funding": 40.879725228,
  //     "timestamp": "2024-06-12T10:00:00",
  //     "trading_pair": 323
  //   },
  //   {
  //     "id": 60982,
  //     "exchange": "hmx-arbitrum",
  //     "token": "BTC",
  //     "origin_funding": 0.0052717477,
  //     "hourly_funding": 0.0052717477,
  //     "daily_funding": 0.1265219452,
  //     "annual_funding": 46.180509852,
  //     "timestamp": "2024-06-12T09:00:04.181676",
  //     "trading_pair": 179
  //   },
  //   {
  //     "id": 60990,
  //     "exchange": "oxfun",
  //     "token": "BTC",
  //     "origin_funding": 0.00007,
  //     "hourly_funding": 0.00007,
  //     "daily_funding": 0.00168,
  //     "annual_funding": 0.6132,
  //     "timestamp": "2024-06-12T09:00:00.802000",
  //     "trading_pair": 245
  //   },
  //   {
  //     "id": 60988,
  //     "exchange": "hyperliquid",
  //     "token": "BTC",
  //     "origin_funding": 0.0000126,
  //     "hourly_funding": 0.00126,
  //     "daily_funding": 0.03024,
  //     "annual_funding": 11.0376,
  //     "timestamp": "2024-06-12T09:00:00.056000",
  //     "trading_pair": 1
  //   },
  //   {
  //     "id": 61354,
  //     "exchange": "rabbitx",
  //     "token": "BTC",
  //     "origin_funding": 0.0000250438,
  //     "hourly_funding": 0.0025043783,
  //     "daily_funding": 0.0601050789,
  //     "annual_funding": 21.938353908,
  //     "timestamp": "2024-06-12T09:00:00",
  //     "trading_pair": 323
  //   },
  //   {
  //     "id": 61065,
  //     "exchange": "aevo",
  //     "token": "BTC",
  //     "origin_funding": 0.000019,
  //     "hourly_funding": 0.0019,
  //     "daily_funding": 0.0456,
  //     "annual_funding": 16.644,
  //     "timestamp": "2024-06-12T09:00:00",
  //     "trading_pair": 131
  //   },
  //   {
  //     "id": 60580,
  //     "exchange": "hmx-arbitrum",
  //     "token": "BTC",
  //     "origin_funding": 0.0052790174,
  //     "hourly_funding": 0.0052790174,
  //     "daily_funding": 0.1266964166,
  //     "annual_funding": 46.244192424,
  //     "timestamp": "2024-06-12T08:00:04.458000",
  //     "trading_pair": 179
  //   },
  //   {
  //     "id": 60589,
  //     "exchange": "oxfun",
  //     "token": "BTC",
  //     "origin_funding": 0.00007,
  //     "hourly_funding": 0.00007,
  //     "daily_funding": 0.00168,
  //     "annual_funding": 0.6132,
  //     "timestamp": "2024-06-12T08:00:00.719000",
  //     "trading_pair": 245
  //   },
  //   {
  //     "id": 60586,
  //     "exchange": "hyperliquid",
  //     "token": "BTC",
  //     "origin_funding": 0.0000157,
  //     "hourly_funding": 0.00157,
  //     "daily_funding": 0.03768,
  //     "annual_funding": 13.7532,
  //     "timestamp": "2024-06-12T08:00:00.104000",
  //     "trading_pair": 1
  //   },
  //   {
  //     "id": 60749,
  //     "exchange": "aevo",
  //     "token": "BTC",
  //     "origin_funding": 0.000043,
  //     "hourly_funding": 0.0043,
  //     "daily_funding": 0.1032,
  //     "annual_funding": 37.668,
  //     "timestamp": "2024-06-12T08:00:00",
  //     "trading_pair": 131
  //   },
  //   {
  //     "id": 60980,
  //     "exchange": "rabbitx",
  //     "token": "BTC",
  //     "origin_funding": 0.0000331486,
  //     "hourly_funding": 0.0033148589,
  //     "daily_funding": 0.0795566124,
  //     "annual_funding": 29.038163964,
  //     "timestamp": "2024-06-12T08:00:00",
  //     "trading_pair": 323
  //   },
  //   {
  //     "id": 60234,
  //     "exchange": "hmx-arbitrum",
  //     "token": "BTC",
  //     "origin_funding": 0.0053293964,
  //     "hourly_funding": 0.0053293964,
  //     "daily_funding": 0.1279055133,
  //     "annual_funding": 46.685512464,
  //     "timestamp": "2024-06-12T07:00:05.136953",
  //     "trading_pair": 179
  //   },
  //   {
  //     "id": 60246,
  //     "exchange": "oxfun",
  //     "token": "BTC",
  //     "origin_funding": 0.00007,
  //     "hourly_funding": 0.00007,
  //     "daily_funding": 0.00168,
  //     "annual_funding": 0.6132,
  //     "timestamp": "2024-06-12T07:00:00.513000",
  //     "trading_pair": 245
  //   },
  //   {
  //     "id": 60241,
  //     "exchange": "hyperliquid",
  //     "token": "BTC",
  //     "origin_funding": 0.00002779,
  //     "hourly_funding": 0.002779,
  //     "daily_funding": 0.066696,
  //     "annual_funding": 24.34404,
  //     "timestamp": "2024-06-12T07:00:00.055000",
  //     "trading_pair": 1
  //   },
  //   {
  //     "id": 60578,
  //     "exchange": "rabbitx",
  //     "token": "BTC",
  //     "origin_funding": 0.0000256538,
  //     "hourly_funding": 0.0025653815,
  //     "daily_funding": 0.0615691562,
  //     "annual_funding": 22.47274194,
  //     "timestamp": "2024-06-12T07:00:00",
  //     "trading_pair": 323
  //   },
  //   {
  //     "id": 60462,
  //     "exchange": "aevo",
  //     "token": "BTC",
  //     "origin_funding": 0.000029,
  //     "hourly_funding": 0.0029,
  //     "daily_funding": 0.0696,
  //     "annual_funding": 25.404,
  //     "timestamp": "2024-06-12T07:00:00",
  //     "trading_pair": 131
  //   },
  //   {
  //     "id": 59858,
  //     "exchange": "hmx-arbitrum",
  //     "token": "BTC",
  //     "origin_funding": 0.0053373858,
  //     "hourly_funding": 0.0053373858,
  //     "daily_funding": 0.1280972595,
  //     "annual_funding": 46.755499608,
  //     "timestamp": "2024-06-12T06:00:03.783914",
  //     "trading_pair": 179
  //   },
  //   {
  //     "id": 59868,
  //     "exchange": "oxfun",
  //     "token": "BTC",
  //     "origin_funding": 0.00007,
  //     "hourly_funding": 0.00007,
  //     "daily_funding": 0.00168,
  //     "annual_funding": 0.6132,
  //     "timestamp": "2024-06-12T06:00:00.547000",
  //     "trading_pair": 245
  //   },
  //   {
  //     "id": 59865,
  //     "exchange": "hyperliquid",
  //     "token": "BTC",
  //     "origin_funding": 0.00003106,
  //     "hourly_funding": 0.003106,
  //     "daily_funding": 0.074544,
  //     "annual_funding": 27.20856,
  //     "timestamp": "2024-06-12T06:00:00.109000",
  //     "trading_pair": 1
  //   },
  //   {
  //     "id": 59925,
  //     "exchange": "aevo",
  //     "token": "BTC",
  //     "origin_funding": 0.00001,
  //     "hourly_funding": 0.001,
  //     "daily_funding": 0.024,
  //     "annual_funding": 8.76,
  //     "timestamp": "2024-06-12T06:00:00",
  //     "trading_pair": 131
  //   },
  //   {
  //     "id": 60232,
  //     "exchange": "rabbitx",
  //     "token": "BTC",
  //     "origin_funding": 0.0000313031,
  //     "hourly_funding": 0.0031303051,
  //     "daily_funding": 0.0751273234,
  //     "annual_funding": 27.421472676,
  //     "timestamp": "2024-06-12T06:00:00",
  //     "trading_pair": 323
  //   },
  //   {
  //     "id": 59486,
  //     "exchange": "hmx-arbitrum",
  //     "token": "BTC",
  //     "origin_funding": 0.0053736317,
  //     "hourly_funding": 0.0053736317,
  //     "daily_funding": 0.1289671606,
  //     "annual_funding": 47.073013692,
  //     "timestamp": "2024-06-12T05:00:03.787142",
  //     "trading_pair": 179
  //   },
  //   {
  //     "id": 59495,
  //     "exchange": "oxfun",
  //     "token": "BTC",
  //     "origin_funding": 0.000075,
  //     "hourly_funding": 0.000075,
  //     "daily_funding": 0.0018,
  //     "annual_funding": 0.657,
  //     "timestamp": "2024-06-12T05:00:00.703000",
  //     "trading_pair": 245
  //   },
  //   {
  //     "id": 59489,
  //     "exchange": "hyperliquid",
  //     "token": "BTC",
  //     "origin_funding": 0.00004859,
  //     "hourly_funding": 0.004859,
  //     "daily_funding": 0.116616,
  //     "annual_funding": 42.56484,
  //     "timestamp": "2024-06-12T05:00:00.079000",
  //     "trading_pair": 1
  //   },
  //   {
  //     "id": 59856,
  //     "exchange": "rabbitx",
  //     "token": "BTC",
  //     "origin_funding": 0.0000209266,
  //     "hourly_funding": 0.0020926637,
  //     "daily_funding": 0.0502239293,
  //     "annual_funding": 18.331734012,
  //     "timestamp": "2024-06-12T05:00:00",
  //     "trading_pair": 323
  //   },
  //   {
  //     "id": 59849,
  //     "exchange": "aevo",
  //     "token": "BTC",
  //     "origin_funding": 0.000029,
  //     "hourly_funding": 0.0029,
  //     "daily_funding": 0.0696,
  //     "annual_funding": 25.404,
  //     "timestamp": "2024-06-12T05:00:00",
  //     "trading_pair": 131
  //   },
  //   {
  //     "id": 59111,
  //     "exchange": "hmx-arbitrum",
  //     "token": "BTC",
  //     "origin_funding": 0.0054169391,
  //     "hourly_funding": 0.0054169391,
  //     "daily_funding": 0.1300065375,
  //     "annual_funding": 47.452386516,
  //     "timestamp": "2024-06-12T04:00:03.121213",
  //     "trading_pair": 179
  //   }]


  const fetchAllTokens = async () => {
    try {
      const response = await axios.get("http://3.76.134.149:8000/api/tokens");
      // dispatch(updateTokens(response.data));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useAppDispatch();
  const tokensData = useAppSelector((state) => {
    return state.token.tokens;
  });

  useEffect(() => {
    fetchAllTokens();
  }, []);

  const handleShowdata = () => {
    dispatch(fetchTokens());
    console.log(tokensData);
  };
  console.log(tokensData);
  return (
    <section className=" text-white">
      <div className="w-full">
        <div className="py-5">
          <h1
            className="text-3xl font-bold text-white"
            onClick={handleShowdata}
          >
            Funding Rates
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row w-full border border-white/20 py-4  rounded-[16px] mb-4 bg-gray-800  gap-4 px-4">
          <div className="grid grid-cols-12 w-full lg:gap-8 gap-4  ">
            <div className=" col-span-full lg:col-span-4 ">
              {/* <SelectInput label="Token" options={tokenSelectOptions} /> */}

              <SearchInput
                label="Token"
                placeholder="Search/Enter Token: "
                options={tokensData}
              />
            </div>
            <div className=" col-span-full lg:col-span-4 flex flex-col">
              <FilterInput label="Minimum funding rate" />
            </div>
            <div className=" col-span-full lg:col-span-4 flex flex-col">
              <SearchInput
                label="Exhange"
                options={[""]}
                placeholder="Search/Enter Exchange:"
              />
            </div>
          </div>
          <div className="mt-auto mb-1 mx-auto   ">
            <PrimaryButton buttonText="GO" buttonIcon={<GrNext />} />
          </div>
        </div>

        <div className="grid grid-cols-10 gap-4   ">
          <div className="border col-span-full lg:col-span-3  rounded-[16px] bg-gray-800 border-white/20">
            <div className="py-5 px-4  ">
              <h3 className="text-white/90 font-bold text-base">
                Table results
              </h3>
            </div>

            <div className="overflow-x-auto text-black">
              <AppTable<TableItem>
                columns={fundingRatesTableColumn}
                data={fundingRatesTableSampleData}
              />
            </div>
          </div>
          <div className="border col-span-full lg:col-span-5   rounded-lg flex flex-col gap-4 border-white/20">
            <div className=" ">
              <h2 className="text-center text-black font-bold">
                Funding history chart (from selected row in table)
              </h2>
            </div>
            <div className=" ">
              <h2 className="text-center text-black font-bold">
                Price chart (from selected row in table)
              </h2>
            </div>
          </div>
          <div className="border col-span-full lg:col-span-2  rounded-[16px] bg-gray-800 border-white/20">
            <div className="py-5 px-4  ">
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
                tableHeadRowClassName=" hidden"
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
