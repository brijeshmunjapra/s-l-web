import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching fourth section images
export const fetchFourthSectionImages = createAsyncThunk(
  'fourthSection/fetchFourthSectionImages',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_WEB_URL_API || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const fullUrl = `${baseUrl}/api/image-section/images`;
      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        // Filter images by status "active"
        const topRowActive = data.data.top_row?.filter(img => img.status === 'active') || [];
        const bottomRowActive = data.data.bottom_row?.filter(img => img.status === 'active') || [];

        return {
          topRow: topRowActive,
          bottomRow: bottomRowActive
        };
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fourthSectionSlice = createSlice({
  name: 'fourthSection',
  initialState: {
    topRowImages: [],
    bottomRowImages: [],
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
      .addCase(fetchFourthSectionImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFourthSectionImages.fulfilled, (state, action) => {
        state.loading = false;
        state.topRowImages = action.payload.topRow;
        state.bottomRowImages = action.payload.bottomRow;
        state.error = null;
      })
      .addCase(fetchFourthSectionImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = fourthSectionSlice.actions;
export default fourthSectionSlice.reducer;