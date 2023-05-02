import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsers } from "../../types/IUsers";
import { UsersService } from "../services/UserServices";
import { AppDispatch, RootState } from "../../store";
interface SearchState {
  query: string;
  movies: IUsers[];
  status: "idle" | "loading" | "failed";
}
const initialState: SearchState = {
  query: "",
  movies: [],
  status: "idle",
};
export const searchAsync = createAsyncThunk(
  "search/searchAsync",
  async (query: string) => {
    const res = await UsersService.getAllShows();
    const filteredMovies = res.data.filter(
      (movie: { name: string }) =>
        movie.name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredMovies;
  }
);
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload;
      });
  },
});
export const { setQuery } = searchSlice.actions;
export const selectMovies = (state: RootState) => state.search.movies;
export const selectStatus = (state: RootState) => state.search.status;
export default searchSlice.reducer;
