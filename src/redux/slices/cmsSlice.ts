import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as newsApi from "../../api/newsService";
import * as slideApi from "../../api/slideService";

interface CMSState {
  news: any[];
  categories: any[];
  slides: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CMSState = {
  news: [],
  categories: [],
  slides: [],
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  "cms/fetchNews",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await newsApi.getNewsList(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch news");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "cms/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await newsApi.getNewsCategories();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
);

export const fetchSlides = createAsyncThunk(
  "cms/fetchSlides",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await slideApi.getSlideList(params);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch slides");
    }
  }
);

const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    clearCMSError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch News
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Slides
      .addCase(fetchSlides.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlides.fulfilled, (state, action) => {
        state.loading = false;
        state.slides = action.payload;
      })
      .addCase(fetchSlides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCMSError } = cmsSlice.actions;
export default cmsSlice.reducer;
