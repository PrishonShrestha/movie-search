import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/moviesSlice";
import genreReducer from "./features/genreSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    genre: genreReducer,
  },
});

export default store;
