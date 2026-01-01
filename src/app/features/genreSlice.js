import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// API
const apiKey = import.meta.env.VITE_API_KEY;

export const fetchGenre = createAsyncThunk("fetchGenre", async () => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?&api_key=${apiKey}`
    );
    const newArray = res.data.genres;

    newArray.unshift({ id: 1, name: "All Genre" });

    // const genreList = res.data.genres.map((genre) => genre.name);

    // const genreList = newArray.map((genre) => genre.name);

    console.log("New Genre:", newArray);

    return { genreList: newArray };
  } catch (error) {
    console.log("Error", error);
  }
});

const genreSlice = createSlice({
  name: "genre",
  initialState: {
    selectedGenre: "All Genre",
    genreList: [],
  },
  reducers: {
    setSelectedGenre(state, action) {
      state.selectedGenre = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenre.fulfilled, (state, action) => {
      state.genreList = action.payload.genreList;
    });
  },
});

export const { setSelectedGenre } = genreSlice.actions;

export default genreSlice.reducer;
