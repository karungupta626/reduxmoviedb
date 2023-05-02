import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "../services/UserDetails";
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}
interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};
const createUserAsync = createAsyncThunk(
    "auth/createUser",
    async (userData: User) => {
      const response = await createUser(userData)
      return response;
    }
  )
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Error creating user";
      });
  },
});
export const { } = authSlice.actions;
export default authSlice.reducer;
