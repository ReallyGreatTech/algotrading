import AppTable from '../components/AppTable';
import PaginationControls from '../components/PaginationControls';
import { statusExchangesColumns } from '../constants/data/positionsPage';
import { useAppSelector } from '../hooks';
import { StatExchange } from '../types';

const System = () => {
  const stats = useAppSelector((state) => state.stats);

  return (
    <section className="min-h-screen pb-10">
      <div className="py-5">
        <h1 className="text-2xl font-semibold text-white/90">System</h1>
      </div>
      <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800 mb-5">
        <div className="flex p-5 justify-between items-center">
          <h3 className="text-white/90 font-semibold">Stats</h3>
        </div>

        <div className="overflow-x-auto max-h-[80vh]">
          {stats.loading ? (
            <div className="text-sm text-white/90 w-full h-full flex justify-center items-center">
              Loading Stats...
            </div>
          ) : (
            <div id="stats-table">
              <AppTable<StatExchange>
                columns={statusExchangesColumns}
                data={stats.data.exchanges}
              />
            </div>
          )}
        </div>
        <PaginationControls />
      </div>
    </section>
  );
};

export default System;
