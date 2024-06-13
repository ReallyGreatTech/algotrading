import { combineReducers } from 'redux';
import tokens from './tokensSlice';

const reducer = combineReducers({
  tokens,
});

export default reducer;
