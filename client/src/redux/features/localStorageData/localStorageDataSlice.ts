import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageMarketData, Market } from '../../../types';
import { AppDispatch } from '../../store';

interface LocalStorageMarketDataState {
  isPending: boolean;
  loading: boolean;
  data: LocalStorageMarketData;
  error: string;
}

const storageData = localStorage.getItem('marketsData');
const data = storageData
  ? (JSON.parse(storageData) as LocalStorageMarketData)
  : {
      favourites: [],
      hidden: [],
    };

const initialState: LocalStorageMarketDataState = {
  loading: false,
  isPending: false,
  data,
  error: '',
};

const localStorageMarketData = createSlice({
  name: 'localStorageMarketsData',
  initialState,
  reducers: {
    favouriteMarketToggled: (state, action: PayloadAction<Market>) => {
      const market = action.payload;

      const index = state.data.favourites.findIndex((m) => m.id === market.id);

      if (index === -1) state.data.favourites.push(action.payload);
      else state.data.favourites.splice(index, 1);

      localStorage.setItem('marketsData', JSON.stringify(state.data));
    },
    hiddenMarketToggled: (state, action: PayloadAction<Market>) => {
      const market = action.payload;

      const index = state.data.hidden.findIndex((m) => m.id === market.id);

      if (index === -1) state.data.hidden.push(action.payload);
      else state.data.hidden.splice(index, 1);

      localStorage.setItem('marketsData', JSON.stringify(state.data));
    },
  },
});

export default localStorageMarketData.reducer;
const { favouriteMarketToggled, hiddenMarketToggled } =
  localStorageMarketData.actions;

export const toggleFavouriteMarket =
  (market: Market) => (dispatch: AppDispatch) => {
    dispatch(favouriteMarketToggled(market));
  };

export const toggleHideMarket = (market: Market) => (dispatch: AppDispatch) => {
  dispatch(hiddenMarketToggled(market));
};
