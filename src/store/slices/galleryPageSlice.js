import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching gallery page content
export const fetchGalleryPageContent = createAsyncThunk(
  'galleryPage/fetchGalleryPageContent',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_WEB_URL_API || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const fullUrl = `${baseUrl}/api/content/page/gallery`;

      console.log('Fetching gallery page content from:', fullUrl);

      const response = await fetch(fullUrl);

      console.log('Gallery page API response received, status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch gallery page content' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Gallery page content response:', data);

      return data;
    } catch (error) {
      console.error('Gallery page content fetch error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const galleryPageSlice = createSlice({
  name: 'galleryPage',
  initialState: {
    data: null,
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
      .addCase(fetchGalleryPageContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryPageContent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchGalleryPageContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = galleryPageSlice.actions;
export default galleryPageSlice.reducer;