import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMoviesByName = createAsyncThunk(
  "FetchMoviesByName",
  async (query, page) => {
    try {
      if (!query || query.trim() === "") return [];

      const results = axios.get(`https://api.themoviedb.org/3/search/movie?`, {
        params: {
          query: query,
          language: "en",
          page: page,
          api_key: apiKey,
        },
      });

      return (await results).data.results;
    } catch (error) {
      console.error("API ERROR:", error.response?.data || error.message);

      throw error;
    }
  }
);

const moviesByNameSlice = createSlice({
  name: "movieByName",

  initialState: {
    name: "",
    page: 1,
    moviesByName: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setName: (state, action) => {
      state.query = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMoviesByName.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMoviesByName.fulfilled, (state, aciton) => {
      state.isLoading = false;
      state.moviesByName = action.payload;
    });

    builder.addCase(fetchMoviesByName.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.error.message);
    });
  },
});

export default moviesByNameSlice.reducer;
