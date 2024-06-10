import AppTable from "../components/AppTable";
import PrimaryButton from "../components/PrimaryButton";
import SelectInput from "../components/SelectInput";
import { GrNext } from "react-icons/gr";
import { tokenSelectOptions } from "../constants/selectOptions";
import {
  fundingRatesTableColumn,
  fundingRatesTableSampleData,
} from "../constants/data/fundingRatesPage";
import { TableItem } from "../types";

const FundingRates = () => {
  return (
    <section className=" text-white ">
      <div className="w-full">
        <div className="py-5">
          <h1 className="text-3xl font-bold text-white">Funding Rates</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row w-full border border-white/20 py-4  rounded-[16px] mb-4 bg-gray-800  gap-4 px-4">
          <div className="grid grid-cols-12 w-full lg:gap-4 gap-4  ">
            <div className=" col-span-full md:col-span-4 ">
              <SelectInput label="Token" options={tokenSelectOptions} />
            </div>
            <div className=" col-span-full md:col-span-4 flex flex-col">
              <SelectInput
                label="Minimum funding rate"
                options={tokenSelectOptions}
              />
            </div>
            <div className=" col-span-full md:col-span-4 flex flex-col">
              <SelectInput label="Exchange" options={tokenSelectOptions} />
            </div>
          </div>
          <div className="mt-auto mb-1 mx-auto   ">
            <PrimaryButton buttonText="GO" buttonIcon={<GrNext />} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4  ">
          <div className="border col-span-full md:col-span-4 h-full rounded-[16px] bg-gray-800 border-white/20">
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
          <div className="border col-span-full md:col-span-5  h-full rounded-md flex flex-col gap-4">
            <div className=" h-1/2">
              <h2 className="text-center text-black font-bold">
                Funding history chart (from selected row in table)
              </h2>
            </div>
            <div className=" h-1/2">
              <h2 className="text-center text-black font-bold">
                Price chart (from selected row in table)
              </h2>
            </div>
          </div>
          <div className="border col-span-full md:col-span-3  h-full rounded-md">
            <h2 className="mt-5 text-black text-center font-bold">
              Order Book (from Selected row in table)
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundingRates;
