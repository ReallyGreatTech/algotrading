import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { fetchStatsRecurrently } from '../redux/features/stats/statsSlice';
import { Link, useLocation } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

const StatsWarning = () => {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const { data } = useAppSelector((state) => state.stats);
  const dispatch = useAppDispatch();
  const warningCount = data.exchanges.filter((ex) => ex.warning).length;

  useEffect(() => {
    dispatch(fetchStatsRecurrently());
  }, []);

  useEffect(() => {
    setHidden(false);
  }, [warningCount]);

  return !warningCount
    ? null
    : !hidden && (
        <div>
          <div className="border-red-700 border bg-red-500/20 text-white/70 text-sm p-4 py-2 rounded-md flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="p-3 rounded-full bg-red-900/50">
                <FiAlertTriangle className="text-xl" />
              </div>
              <div>
                {warningCount}{' '}
                {warningCount === 1
                  ? 'exchange is showing a warning '
                  : 'exchanges are showing warnings.'}
              </div>
            </div>

            <div className="flex gap-2">
              {!location.pathname.startsWith('/system') && (
                <Link to="/system">
                  <button className="rounded-lg px-3 py-1 text-white/90 bg-red-700/10 hover:bg-red-700/40 text-xs">
                    View Stats
                  </button>
                </Link>
              )}
              <button
                className="rounded-lg px-3 py-1 text-white/90 bg-red-700/10 hover:bg-red-700/40 text-xs"
                onClick={() => setHidden(true)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
};

export default StatsWarning;
