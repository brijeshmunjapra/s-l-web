import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching blog couples data
export const fetchBlogCouples = createAsyncThunk(
  'blogCouples/fetchBlogCouples',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/blogs/couples');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data && data.data.couples) {
        // Filter couples if needed, but according to the requirements, we show all couples
        // The filtering for active images happens within each couple's images array
        return data.data.couples.map(couple => ({
          ...couple,
          // Filter images to only include active ones
          images: couple.images?.filter(img => img.active === true) || []
        }));
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blogCouplesSlice = createSlice({
  name: 'blogCouples',
  initialState: {
    couples: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogCouples.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogCouples.fulfilled, (state, action) => {
        state.loading = false;
        state.couples = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogCouples.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = blogCouplesSlice.actions;
export default blogCouplesSlice.reducer;