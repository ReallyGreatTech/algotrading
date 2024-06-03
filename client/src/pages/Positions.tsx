import AppTable from '../components/AppTable';
import TopNav from '../components/TopNav';
import {
  investorActionTableColumn,
  investorActionTableSampleData,
  investorTableColumn,
  investorTableSampleData,
  positionsTableColumn,
  positionsTableSampleData,
  walletsTableColumn,
  walletsTableSampleData,
} from '../constants/data/positionsPage';
import { DataItem, Investor, InvestorAction, Wallet } from '../types';

const Positions = () => {
  return (
    <section className="container mx-auto px-10">
      <TopNav />

      <div className="py-5 pb-10">
        <h1 className="text-3xl font-bold">Positions</h1>
      </div>
      <div className="flex flex-row flex-nowrap overflow-x-auto mb-5 gap-5">
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Add Wallet
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Update Wallet
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Delete Wallet
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Add Investor
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Update Investor
        </button>
        <button className="px-5 py-2 font-semibold bg-purple-800">
          Delete Investor
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-6">
        <div className="col-span-5 min-h-[20em] border border-white/10 rounded-sm overflow-auto p-5">
          <AppTable<Wallet>
            columns={walletsTableColumn}
            data={walletsTableSampleData}
          />
        </div>
        <div className="col-span-7 min-h-[20em] border border-white/10 rounded-sm p-5">
          <AppTable<Investor>
            columns={investorTableColumn}
            data={investorTableSampleData}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-7 min-h-[20em] border border-white/10 rounded-sm overflow-auto p-5">
          <AppTable<DataItem>
            columns={positionsTableColumn}
            data={positionsTableSampleData}
          />
        </div>
        <div className="col-span-5 min-h-[20em] border border-white/10 rounded-sm p-5">
          <AppTable<InvestorAction>
            columns={investorActionTableColumn}
            data={investorActionTableSampleData}
          />
        </div>
      </div>
    </section>
  );
};

export default Positions;
