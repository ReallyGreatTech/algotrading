import { BsBookmarkStarFill } from 'react-icons/bs';
import { FaEyeSlash, FaFilter } from 'react-icons/fa';
import { Market } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  toggleFavouriteMarket,
  toggleHideMarket,
} from '../redux/features/localStorageData/localStorageDataSlice';

interface FundingRateMarketActionsProps {
  market: Market;
}

const FundingRateMarketActions = ({
  market,
}: FundingRateMarketActionsProps) => {
  const dispatch = useAppDispatch();
  const localStorageMarketsData = useAppSelector(
    (state) => state.localStorageMarketData
  );
  const favourites = localStorageMarketsData.data.favourites;
  const hidden = localStorageMarketsData.data.hidden;

  const isFavourite = () => {
    return favourites.findIndex((m) => m.id === market.id) > -1;
  };

  const isHidden = () => {
    return hidden.findIndex((m) => m.id === market.id) > -1;
  };

  return (
    <div className="flex gap-3 items-center justify-center ">
      <span
        className={`hover:cursor-pointer hover:text-red-400 w-[2rem] h-[2rem] rounded-full flex items-center justify-center ${
          isHidden() ? 'text-red-400' : ''
        }`}
        onClick={() => dispatch(toggleHideMarket(market))}
      >
        <FaEyeSlash size={'1.2rem'} />
      </span>
      <span className=" hover:cursor-pointer hover:text-yellow-400 w-[2rem] h-[2rem] rounded-full flex items-center justify-center">
        <FaFilter />
      </span>
      <span
        className={` hover:cursor-pointer hover:text-green-400 w-[2rem] h-[2rem] rounded-full flex items-center justify-center ${
          isFavourite() ? 'text-green-400' : ''
        }`}
        onClick={() => dispatch(toggleFavouriteMarket(market))}
      >
        <BsBookmarkStarFill />
      </span>
    </div>
  );
};

export default FundingRateMarketActions;
