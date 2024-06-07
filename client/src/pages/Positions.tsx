import { AiOutlineExpandAlt } from 'react-icons/ai';
import AppTable from '../components/AppTable';
import TopNav from '../components/TopNav';
import {
  investorTableColumn,
  investorTableSampleData,
  positionsTableColumn,
  positionsTableSampleData,
  walletsTableColumn,
  walletsTableSampleData,
} from '../constants/data/positionsPage';
import { DataItem, Investor, Wallet } from '../types';

const Positions = () => {
  return (
    <section className="p-10 min-h-screen">
      <div className="mb-8">
        <TopNav />
      </div>

      <div className="p-5 w-full">
        <div className="py-5">
          <h1 className="text-3xl font-bold text-white">Positions</h1>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-2 lg:col-span-1">
            <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800 h-auto">
              <div className="flex p-5 justify-between items-center">
                <h3 className="text-white/90 font-semibold">Wallets</h3>
                <button className="text-white bg-primary hover:bg-primary/90 px-5 py-2 rounded-md">
                  Add Wallet
                </button>
              </div>

              <div className="overflow-x-auto">
                <AppTable<Wallet>
                  columns={walletsTableColumn}
                  data={walletsTableSampleData}
                />
              </div>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 flex flex-col gap-y-5">
            <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
              <div className="flex p-5 justify-between items-center">
                <h3 className="text-white/90 font-semibold">Investors</h3>
                <button className="text-white bg-primary hover:bg-primary/90 px-5 py-2 rounded-md">
                  Add Investor
                </button>
              </div>

              <div className="overflow-x-auto">
                <AppTable<Investor>
                  columns={investorTableColumn}
                  data={investorTableSampleData}
                />
              </div>
            </div>

            <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
              <div className="flex p-5 justify-between items-center">
                <h3 className="text-white/90 font-semibold">Positions Table</h3>
                <button className="text-white ">
                  <AiOutlineExpandAlt />
                </button>
              </div>

              <div className="overflow-x-auto">
                <AppTable<DataItem>
                  columns={positionsTableColumn}
                  data={positionsTableSampleData}
                  onRowClick={(item) => {
                    console.log(item);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Positions;
