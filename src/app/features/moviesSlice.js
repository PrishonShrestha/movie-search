import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

// Thunk
export const fetchAllMovies = createAsyncThunk("fetchAllMovies", async () => {
  let results = [];
  // if (genreID && genreID !== 1) {
  //   results = await Promise.allSettled([
  //     // axios.get(
  //     //   `${apiUrl}now_playing?language=en&page=1&api_key=${apiKey}&${genreID}`
  //     // ),
  //     // axios.get(
  //     //   `${apiUrl}upcoming?language=en&page=1&api_key=${apiKey}&${genreID}`
  //     // ),
  //     // axios.get(
  //     //   `${apiUrl}popular?language=en&page=1&api_key=${apiKey}&${genreID}`
  //     // ),
  //     // axios.get(
  //     //   `${apiUrl}top_rated?language=en&page=1&api_key=${apiKey}&${genreID}`
  //     // ),
  //     axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&api_key=${apiKey}&with_genres=${genreID}`
  //     ),
  //     axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?language=en-US&page=2&api_key=${apiKey}&with_genres=${genreID}`
  //     ),
  //     axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?language=en-US&page=3&api_key=${apiKey}&&with_genres=${genreID}`
  //     ),
  //     axios.get(
  //       `https://api.themoviedb.org/3/discover/movie?language=en-US&page=4&api_key=${apiKey}&&with_genres=${genreID}`
  //     ),
  //   ]);

  //   console.log("Genre based result", results);
  // } else {
  //   results = await Promise.allSettled([
  //     axios.get(`${apiUrl}now_playing?language=en&page=1&api_key=${apiKey}`),
  //     axios.get(`${apiUrl}upcoming?language=en&page=1&api_key=${apiKey}`),
  //     axios.get(`${apiUrl}popular?language=en&page=1&api_key=${apiKey}`),
  //     axios.get(`${apiUrl}top_rated?language=en&page=1&api_key=${apiKey}`),
  //   ]);
  //   console.log("No genre", results);
  // }

  // console.log(results);

  results = await Promise.allSettled([
    axios.get(`${apiUrl}now_playing?`, {
      params: {
        language: "en",
        page: 1,
        api_key: apiKey,
      },
    }),
    axios.get(`${apiUrl}upcoming??`, {
      params: {
        language: "en",
        page: 1,
        api_key: apiKey,
      },
    }),
    axios.get(`${apiUrl}popular??`, {
      params: {
        language: "en",
        page: 1,
        api_key: apiKey,
      },
    }),
    axios.get(`${apiUrl}top_rated?`, {
      params: {
        language: "en",
        page: 1,
        api_key: apiKey,
      },
    }),
  ]);

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

// Movie by genre
// export const fetchMoviesByGenre = createAsyncThunk(
//   "fetchMoviesByGenre",
//   async (genreID) => {
//     if (genreID && genreID !== 1) {
//       const results = await axios.get(
//         `https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&api_key=${apiKey}&with_genres=${genreID}`
//       );

//       return { moviesByGenre: results.data.results };
//     }
//   }
// );

// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    recentMovies: [],
    upcomingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    // moviesByGenre: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMovies.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recentMovies = action.payload.recentMovies;
      state.upcomingMovies = action.payload.upcomingMovies;
      state.popularMovies = action.payload.popularMovies;
      state.topRatedMovies = action.payload.topRatedMovies;
    });
    builder.addCase(fetchAllMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // By Genre

    // builder.addCase(fetchMoviesByGenre.pending, (state, action) => {
    //   state.isLoading = true;
    // });

    // builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.moviesByGenre = action.payload.moviesByGenre;
    // });

    // builder.addCase(fetchMoviesByGenre.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default moviesSlice.reducer;
