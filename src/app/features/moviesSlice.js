// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// // API
// const apiUrl = import.meta.env.VITE_API_URL;
// const apiKey = import.meta.env.VITE_API_KEY;

// // Thunk
// export const fetchAllMovies = createAsyncThunk(
//   "fetchAllMovies",
//   async ({ page }) => {
//     let results = [];

//     results = await Promise.allSettled([
//       axios.get(`${apiUrl}now_playing?`, {
//         params: {
//           language: "en",
//           page: page,
//           api_key: apiKey,
//         },
//       }),
//       axios.get(`${apiUrl}upcoming?`, {
//         params: {
//           language: "en",
//           page: page,
//           api_key: apiKey,
//         },
//       }),
//       axios.get(`${apiUrl}popular?`, {
//         params: {
//           language: "en",
//           page: page,
//           api_key: apiKey,
//         },
//       }),
//       axios.get(`${apiUrl}top_rated?`, {
//         params: {
//           language: "en",
//           page: page,
//           api_key: apiKey,
//         },
//       }),
//     ]);

//     return {
//       recentMovies:
//         results[0].status === "fulfilled" ? results[0].value.data.results : [],
//       upcomingMovies:
//         results[1].status === "fulfilled" ? results[1].value.data.results : [],
//       popularMovies:
//         results[2].status === "fulfilled" ? results[2].value.data.results : [],
//       topRatedMovies:
//         results[3].status === "fulfilled" ? results[3].value.data.results : [],
//     };
//   }
// );

// // Slice
// const moviesSlice = createSlice({
//   name: "movies",
//   initialState: {
//     recentMovies: [],
//     upcomingMovies: [],
//     popularMovies: [],
//     topRatedMovies: [],
//     page: {
//       upcoming: 1,
//       popular: 1,
//       topRated: 1,
//     },
//     hasMore: {
//       upcoming: true,
//       popular: true,
//       topRated: true,
//     },
//     isLoading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(fetchAllMovies.pending, (state, action) => {
//       state.isLoading = true;
//     });
//     builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.recentMovies.push(...action.payload.recentMovies);
//       state.upcomingMovies.push(...action.payload.upcomingMovies);
//       state.popularMovies.push(...action.payload.popularMovies);
//       state.topRatedMovies.push(...action.payload.topRatedMovies);

//       state.pages[category] = page;
//       state.hasMore[category] = page < totalPages;

//       // state.page[category] = action.payload.page;
//       // state.hasMore = action.payload.page < action.payload.totalPages;
//     });
//     builder.addCase(fetchAllMovies.rejected, (state, action) => {
//       state.isLoading = false;
//       state.error = action.error.message;
//     });
//   },
// });

// export default moviesSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

// Thunk: fetch movies per category
export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async ({ page, category }) => {
    let url;

    // Determine API endpoint for the category
    switch (category) {
      case "recent":
        url = `${apiUrl}now_playing?`;
        break;
      case "upcoming":
        url = `${apiUrl}upcoming?`;
        break;
      case "popular":
        url = `${apiUrl}popular?`;
        break;
      case "topRated":
        url = `${apiUrl}top_rated?`;
        break;
      default:
        throw new Error("Invalid category");
    }

    const response = await axios.get(url, {
      params: {
        language: "en",
        page,
        api_key: apiKey,
      },
    });

    return {
      category,
      results: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
    };
  }
);

const initialState = {
  recentMovies: [],
  upcomingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  pages: {
    recent: 1,
    upcoming: 1,
    popular: 1,
    topRated: 1,
  },
  hasMore: {
    recent: true,
    upcoming: true,
    popular: true,
    topRated: true,
  },
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        const { category, results, page, totalPages } = action.payload;

        // Append results to correct category
        switch (category) {
          case "recent":
            state.recentMovies.push(...results);
            break;
          case "upcoming":
            state.upcomingMovies.push(...results);
            break;
          case "popular":
            state.popularMovies.push(...results);
            break;
          case "topRated":
            state.topRatedMovies.push(...results);
            break;
          default:
            break;
        }

        // Update page and hasMore for this category
        state.pages[category] = page;
        state.hasMore[category] = page < totalPages;

        state.isLoading = false;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
