import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Investor } from '../../../types';
import {
  addInvestor,
  deleteInvestor,
  fetchInvestors,
  updateInvestor,
} from '../../api/investors';
import { AppDispatch } from '../../store';

interface InvestorsState {
  loading: boolean;
  isPending: boolean;
  selectedInvestor: number | undefined;
  data: Investor[];
  error: string;
}

const initialState: InvestorsState = {
  loading: false,
  isPending: false,
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
      state.isPending = true;
    });
    builder.addCase(
      fetchInvestors.fulfilled,
      (state, action: PayloadAction<{ results: Investor[] }>) => {
        state.data = action.payload.results;
        state.isPending = false;
      }
    );
    builder.addCase(fetchInvestors.rejected, (state, action) => {
      state.isPending = false;
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

    // Update investor
    builder.addCase(updateInvestor.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(
      updateInvestor.fulfilled,
      (state, action: PayloadAction<Investor>) => {
        const updatedInvestor = action.payload;
        const index = state.data.findIndex(
          (investor) => investor.id === updatedInvestor.id
        );

        if (index > -1) state.data[index] = updatedInvestor;

        state.isPending = false;
      }
    );
    builder.addCase(updateInvestor.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isPending = false;
    });

    //Delete investor
    builder.addCase(deleteInvestor.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(
      deleteInvestor.fulfilled,
      (state, action: PayloadAction<{ id: number }>) => {
        state.data = state.data.filter((d) => d.id !== action.payload.id);
        state.isPending = false;
      }
    );
    builder.addCase(deleteInvestor.rejected, (state, action) => {
      state.error = action.payload as string;
      state.isPending = false;
    });
  },
});

export default investorsSlice.reducer;
const { investorSelected } = investorsSlice.actions;

export const selectInvestor = (id: number) => (dispatch: AppDispatch) => {
  dispatch(investorSelected(id));
};
