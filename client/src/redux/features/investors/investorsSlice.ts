import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Investor } from '../../../types';
import {
  addInvestor,
  deleteInvestor,
  fetchInvestors,
} from '../../api/investors';
import { AppDispatch } from '../../store';

interface InvestorsState {
  loading: boolean;
  selectedInvestor: number | undefined;
  data: Investor[];
  error: string;
}

const initialState: InvestorsState = {
  loading: false,
  selectedInvestor: undefined,
  data: [],
  error: '',
};

const investorsSlice = createSlice({
  name: 'investors',
  initialState,
  reducers: {
    investorSelected(investors, action) {
      investors.selectedInvestor = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetch investors
    builder.addCase(fetchInvestors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchInvestors.fulfilled,
      (state, action: PayloadAction<{ results: Investor[] }>) => {
        state.data = action.payload.results;
        state.loading = false;
      }
    );
    builder.addCase(fetchInvestors.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload as string;
    });

    // Add investor
    builder.addCase(addInvestor.pending, () => {});
    builder.addCase(
      addInvestor.fulfilled,
      (state, action: PayloadAction<Investor>) => {
        state.data.push(action.payload);
      }
    );
    builder.addCase(addInvestor.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    //Delete investor
    builder.addCase(deleteInvestor.pending, () => {});
    builder.addCase(
      deleteInvestor.fulfilled,
      (state, action: PayloadAction<Investor>) => {
        state.data = state.data.filter((d) => d.id !== action.payload.id);
      }
    );
    builder.addCase(deleteInvestor.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export default investorsSlice.reducer;
const { investorSelected } = investorsSlice.actions;

export const selectInvestor = (id: number) => (dispatch: AppDispatch) => {
  dispatch(investorSelected(id));
};
