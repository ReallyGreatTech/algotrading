import AppTable from '../components/AppTable';
import ListItem from '../components/ListItem';
import SelectInput from '../components/SelectInput';
import TopNav from '../components/TopNav';
import {
  fundingRatesTableColumn,
  fundingRatesTableSampleData,
} from '../constants/data/fundingRatesPage';
import { TableItem } from '../types';

const selectOptions = [
  { label: 'Ethereum', value: 'US' },
  { label: 'BNB', value: 'CA' },
  { label: 'SOL', value: 'FR' },
  { label: 'USDC', value: 'DE' },
];

const FundingRates = () => {
  return (
    <div className="p-10">
      <header>
        <TopNav />
      </header>
      <main className="bg-[#6558F5] text-white  mt-5 rounded-md">
        <h1 className="text-center font-bold py-4 text-2xl">Funding Rates</h1>

        <ul className="flex gap-4  items-center mx-3">
          <li className=" h-[50px]">
            <SelectInput options={selectOptions} defaultValue="FR" />
          </li>
          <ListItem title="Minimum funding rate(yearly)" />
          <ListItem title="Exchanges" />
          <button className="bg-[#730FC3] p-3 rounded-md ">Go!</button>
        </ul>

        <section className="grid grid-cols-12 gap-4  p-5 ">
          <div className="border col-span-full md:col-span-3 bg-[#F7C325] h-full rounded-md ">
            <h2 className="mt-5 text-black text-center font-bold">
              Table Results
            </h2>

            <div className="overflow-auto text-black">
              <AppTable<TableItem>
                columns={fundingRatesTableColumn}
                data={fundingRatesTableSampleData}
              />
            </div>
          </div>
          <div className="border col-span-full md:col-span-6  h-full rounded-md flex flex-col gap-4">
            <div className="bg-[#F7C325] h-1/2">
              <h2 className="text-center text-black font-bold">
                Funding history chart (from selected row in table)
              </h2>
            </div>
            <div className="bg-[#F7C325] h-1/2">
              {' '}
              <h2 className="text-center text-black font-bold">
                {' '}
                Price chart (from selected row in table)
              </h2>
            </div>
          </div>
          <div className="border col-span-full md:col-span-3 bg-[#F7C325] h-full rounded-md">
            <h2 className="mt-5 text-black text-center font-bold">
              Order Book (from Selected row in table)
            </h2>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FundingRates;
