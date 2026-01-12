import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/moviesSlice";
import genreReducer from "./features/genreSlice";
import searchReducer from "./features/searchSlice";
import favouriteReducer from "./features/favouriteSlice";
import moviesByNameReducer from "./features/moviesByNameSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// const store = configureStore({
//   reducer: {
//     movies: moviesReducer,
//     genre: genreReducer,
//     search: searchReducer,
//     favourite: favouriteReducer,
//   },
// });

// export default store;

const rootReducer = combineReducers({
  movies: moviesReducer,
  genre: genreReducer,
  search: searchReducer,
  favourite: favouriteReducer,
  moviesByName: moviesByNameReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favourite"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
