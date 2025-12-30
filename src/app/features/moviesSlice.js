import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

// Thunk
export const fetchMovies = createAsyncThunk("fetchMovies", async () => {
  const results = await Promise.allSettled([
    axios.get(`${apiUrl}now_playing?language=en&page=1&api_key=${apiKey}`),
    axios.get(`${apiUrl}upcoming?language=en&page=1&api_key=${apiKey}`),
    axios.get(`${apiUrl}popular?language=en&page=1&api_key=${apiKey}`),
    axios.get(`${apiUrl}top_rated?language=en&page=1&api_key=${apiKey}`),
  ]);
  console.log(results);

  return {
    recentMovies:
      results[0].status === "fulfilled" ? results[0].value.data.results : [],
    upcomingMovies:
      results[1].status === "fulfilled" ? results[1].value.data.results : [],
    popularMovies:
      results[2].status === "fulfilled" ? results[2].value.data.results : [],
    topRatedMovies:
      results[3].status === "fulfilled" ? results[3].value.data.results : [],
  };
});

// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    genre: "",
    recentMovies: [],
    upcomingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setGenre(state, action) {
      state.genre = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recentMovies = action.payload.recentMovies;
      state.upcomingMovies = action.payload.upcomingMovies;
      state.popularMovies = action.payload.popularMovies;
      state.topRatedMovies = action.payload.topRatedMovies;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default moviesSlice.reducer;
