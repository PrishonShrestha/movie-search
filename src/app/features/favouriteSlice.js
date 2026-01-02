import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favouriteMovies: [],
  },
  reducers: {
    setAsFavourite(state, action) {
      const exists = state.favouriteMovies.find(
        (m) => m.id === action.payload.id
      );
      if (!exists) state.favouriteMovies.push(action.payload);
    },
    removeFromFavourite(state, action) {
      state.favouriteMovies = state.favouriteMovies.filter(
        (m) => m.id !== action.payload.id
      );
    },
    // checkIfMovieExistsInCart(state, action) {
    //   const exists = state.favouriteMovies.find(
    //     (m) => m.id === action.payload.id
    //   );
    //   if (exists) state.movieExists = true;
    // },
  },
});
export const { setAsFavourite, removeFromFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
