import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUsers } from '../../types/IUsers';
interface DetailState {
  user: IUsers | null;
  cast: any[];
  isLoading: boolean;
  error: string | null;
}
const initialState: DetailState = {
  user: null,
  cast: [],
  isLoading: false,
  error: null,
};
const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    getUserStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<IUsers>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCastStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getCastSuccess(state, action: PayloadAction<any[]>) {
      state.cast = action.payload;
      state.isLoading = false;
    },
    getCastFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const {
  getUserStart,
  getUserSuccess,
  getUserFailure,
  getCastStart,
  getCastSuccess,
  getCastFailure,
} = detailSlice.actions;
export default detailSlice.reducer;
  
  
  