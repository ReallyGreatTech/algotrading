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
    <section className="p-10">
      <div className="mb-8">
        <TopNav />
      </div>

      <div className="bg-[#6558F5] p-5 w-full">
        <div className="py-5 pb-10">
          <h1 className="text-3xl font-bold text-white">Positions</h1>
        </div>
        <div className="flex flex-row flex-nowrap overflow-x-auto mb-5 gap-5">
          <button className="px-5 py-2 font-semibold bg-[#730FC3] text-white">
            Add Wallet
          </button>
          <button className="px-5 py-2 font-semibold bg-[#730FC3] text-white">
            Update Wallet
          </button>
          <button className="px-5 py-2 font-semibold bg-[#730FC3] text-white">
            Delete Wallet
          </button>
          <button className="px-5 py-2 font-semibold bg-[#730FC3] text-white">
            Add Investor
          </button>
          <button className="px-5 py-2 font-semibold bg-[#730FC3] text-white">
            Update Investor
          </button>
          <button className="px-5 py-2 font-semibold bg-[#730FC3] text-white">
            Delete Investor
          </button>
        </div>

        <div className="grid grid-cols-12 gap-5 mb-6">
          <div className="col-span-5 min-h-[20em] bg-[#F7C325] rounded-sm overflow-auto p-5 ">
            <h4 className="font-semibold text-2xl mb-5">Wallets</h4>
            <div className="max-h-[20em]">
              <AppTable<Wallet>
                columns={walletsTableColumn}
                data={walletsTableSampleData}
              />
            </div>
          </div>
          <div className="col-span-7 min-h-[20em] bg-[#F7C325] rounded-sm p-5">
            <h4 className="font-semibold text-2xl mb-5">Investors</h4>
            <div className="max-h-[20em] overflow-auto">
              <AppTable<Investor>
                columns={investorTableColumn}
                data={investorTableSampleData}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-7 min-h-[20em] bg-[#F7C325] rounded-sm overflow-auto p-5">
            <h4 className="font-semibold text-2xl mb-5">Positions</h4>
            <AppTable<DataItem>
              columns={positionsTableColumn}
              data={positionsTableSampleData}
              tableBodyRowClassName="hover:opacity-70 cursor-pointer"
              onRowClick={(item) => {
                console.log(item);
              }}
            />
          </div>
          <div className="col-span-5 min-h-[20em] bg-[#F7C325] rounded-sm p-5">
            <h4 className="font-semibold text-2xl mb-5">Investor Actions</h4>
            <div className="max-h-[25em] overflow-auto">
              <AppTable<InvestorAction>
                tableBodyRowClassName="hover:opacity-70 cursor-pointer"
                columns={investorActionTableColumn}
                data={investorActionTableSampleData}
                onRowClick={(item) => {
                  console.log(item);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Positions;
