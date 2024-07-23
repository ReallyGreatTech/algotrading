import { useAppDispatch, useAppSelector } from '../hooks';
import { setFitlerToken } from '../redux/features/localStorageData/localStorageDataSlice';
import { fetchMarket } from '../redux/api/markets';

const MarketFilterBox = () => {
  const dispatch = useAppDispatch();
  const localStorageMarketsData = useAppSelector(
    (state) => state.localStorageMarketData
  );

  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-xs">Filtering by token:</p>
        <p className="font-semibold text-sm">
          {localStorageMarketsData.filterToken}
        </p>
      </div>
      <button
        className="py-2 px-3 rounded-xl text-xs bg-primary-dark"
        onClick={() => {
          dispatch(setFitlerToken(''));
          dispatch(fetchMarket({}));
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default MarketFilterBox;
