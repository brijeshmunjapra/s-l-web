import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching gallery images
export const fetchGalleryImages = createAsyncThunk(
  'galleryImages/fetchGalleryImages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/gallery');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data && data.data.images) {
        // Filter images by active status and sort by displayOrder
        const activeImages = data.data.images
          .filter(img => img.active === true)
          .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
        return activeImages;
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const galleryImagesSlice = createSlice({
  name: 'galleryImages',
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
      .addCase(fetchGalleryImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
        state.error = null;
      })
      .addCase(fetchGalleryImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = galleryImagesSlice.actions;
export default galleryImagesSlice.reducer;