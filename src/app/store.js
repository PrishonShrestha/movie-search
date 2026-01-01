import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/moviesSlice";
import genreReducer from "./features/genreSlice";
import searchReducer from "./features/searchSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genre: genreReducer,
    search: searchReducer,
  },
});

export default store;
