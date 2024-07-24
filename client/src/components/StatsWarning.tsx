import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { fetchStatsRecurrently } from '../redux/features/stats/statsSlice';
import { Link, useLocation } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

const StatsWarning = () => {
  const location = useLocation();
  const { data } = useAppSelector((state) => state.stats);
  const dispatch = useAppDispatch();
  const warningCount = data.exchanges.filter((ex) => ex.warning).length;

  useEffect(() => {
    dispatch(fetchStatsRecurrently());
  }, []);

  return !warningCount ? null : (
    <div>
      <div className="border-red-700 border bg-red-500/20 text-white/70 text-sm p-4 py-2 rounded-md flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="p-3 rounded-full bg-red-900/50">
            <FiAlertTriangle className="text-xl" />
          </div>
          <div>
            {warningCount}{' '}
            {warningCount === 1 ? 'exchange is ' : 'exchanges are '}
            not looking good.
          </div>
        </div>

        {!location.pathname.startsWith('/system') && (
          <Link to="/system">
            <button className="rounded-lg px-3 py-1 text-white/90 hover:bg-red-700/40">
              View Stats
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StatsWarning;
