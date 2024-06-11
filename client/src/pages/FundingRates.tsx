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
import { tokens } from "../constants/data/FundingRatesData";
import FilterInput from "../components/FilterInput";


const FundingRates = () => {
  return (
    <section className=" text-white ">
      <div className="w-full">
        <div className="py-5">
          <h1 className="text-3xl font-bold text-white">Funding Rates</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row w-full border border-white/20 py-4  rounded-[16px] mb-4 bg-gray-800  gap-4 px-4">
          <div className="grid grid-cols-12 w-full lg:gap-8 gap-4  ">
            <div className=" col-span-full lg:col-span-4 ">
              {/* <SelectInput label="Token" options={tokenSelectOptions} /> */}

              <SearchInput
                label="Token"
                placeholder="Search/Enter Token: "
                options={tokens}
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
