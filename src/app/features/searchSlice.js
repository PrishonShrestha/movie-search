import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchMovieByName = createAsyncThunk(
  "fetchMovieByName",
  async ({ query, pageNo }) => {
    try {
      console.log("Calllllllllled", query);

      if (!query || query.trim() === "") return [];

      const results = await axios.get(
        `https://api.themoviedb.org/3/search/movie?`,
        {
          params: {
            query: query,
            language: "en",
            page: pageNo,
            api_key: apiKey,
          },
        }
      );
      console.log("results.....", results.data.results);

      return results.data.results;
    } catch (error) {
      console.error("API ERROR:", error.response?.data || error.message);

      throw error;
    }
  }
);

// Fetch movie by genre
export const fetchMovieByGenre = createAsyncThunk(
  "fetchMovieByGenre",
  async ({ genreID, pageNo }) => {
    try {
      if (genreID) {
        const results = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?`,
          {
            params: {
              with_genres: genreID,
              language: "en-US",
              page: pageNo,
              api_key: apiKey,
            },
          }
        );
        return results.data.results;
      }
    } catch (error) {
      throw error;
    }
  }
);

// Search Movie By ID
export const fetchMovieByID = createAsyncThunk(
  "fetchMovieByID",
  async (movieID) => {
    try {
      const results = await Promise.allSettled([
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}?`, {
          params: {
            language: "en-US",
            page: 1,
            api_key: apiKey,
          },
        }),

        axios.get(`https://api.themoviedb.org/3/movie/${movieID}/credits?`, {
          params: {
            language: "en-US",
            api_key: apiKey,
            page: 1,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}/similar?`, {
          params: {
            language: "en-US",
            api_key: apiKey,
            page: 1,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?`, {
          params: {
            language: "en-US",
            api_key: apiKey,
          },
        }),
      ]);

      // Get trailor
      const videos =
        results[3].status === "fulfilled" ? results[3].value.data.results : [];

      const trailer =
        videos.find(
          (v) => v.official && v.type === "Trailer" && v.site === "YouTube"
        ) ||
        videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
        videos.find((v) => v.site === "YouTube");

      const trailerID = trailer?.key || "";

      return {
        movieByID:
          results[0].status === "fulfilled" ? results[0].value.data : [],
        casts:
          results[1].status === "fulfilled" ? results[1].value.data.cast : [],
        similarMovies:
          results[2].status === "fulfilled"
            ? results[2].value.data.results
            : [],
        movieTrailer: trailerID,
      };
    } catch (error) {
      console.log("Error", error.message);
      throw error;
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    moviesByGenre: [],
    moviesByName: [],
    movieByID: [],
    casts: [],
    similarMovies: [],
    movieTrailer: "",
    page: 1,
    isLoading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },

    resetMovies: (state, action) => {
      (state.moviesByName = []),
        (state.moviesByGenre = []),
        (state.page = 1),
        (state.error = null);
    },
  },
  extraReducers: (builder) => {
    // By Name
    builder.addCase(fetchMovieByName.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMovieByName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.moviesByName = [...state.moviesByName, ...action.payload];
      state.page += 1;
    });

    builder.addCase(fetchMovieByName.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.error.message);
    });
    // By Genre
    builder.addCase(fetchMovieByGenre.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMovieByGenre.fulfilled, (state, action) => {
      state.isLoading = false;
      state.moviesByGenre = [...state.moviesByGenre, ...action.payload];
      state.page += 1;
    });

    builder.addCase(fetchMovieByGenre.rejected, (state, action) => {
      (state.isLoading = false), (state.error = action.error.message);
    });

    //  Fetch By Id
    builder.addCase(fetchMovieByID.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMovieByID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.movieByID = action.payload.movieByID;
      state.casts = action.payload.casts;
      state.similarMovies = action.payload.similarMovies;
      state.movieTrailer = action.payload.movieTrailer;
    });

    builder.addCase(fetchMovieByID.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { resetMovies } = searchSlice.actions;

export default searchSlice.reducer;
