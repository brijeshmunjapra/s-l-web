import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching seventh section images
export const fetchSeventhSectionImages = createAsyncThunk(
  'seventhSection/fetchSeventhSectionImages',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_WEB_URL_API || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const fullUrl = `${baseUrl}/api/photo-grid/images`;
      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data && data.data.images) {
        // Filter images by active status, sort by position, and limit to 5 images
        const activeImages = data.data.images
          .filter(img => img.active === true)
          .sort((a, b) => a.position - b.position)
          .slice(0, 5);
        return activeImages;
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const seventhSectionSlice = createSlice({
  name: 'seventhSection',
  initialState: {
    images: [],
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
      .addCase(fetchSeventhSectionImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeventhSectionImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
        state.error = null;
      })
      .addCase(fetchSeventhSectionImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = seventhSectionSlice.actions;
export default seventhSectionSlice.reducer;