import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching gallery sliders
export const fetchGallerySliders = createAsyncThunk(
  'gallerySliders/fetchGallerySliders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/gallery/sliders');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data && data.data.sliders) {
        // Filter sliders by active status
        const activeSliders = data.data.sliders
          .filter(slider => slider.active === true)
          .map(slider => ({
            ...slider,
            // Filter images within each slider by active status
            images: slider.images?.filter(img => img.active === true) || []
          }));

        return activeSliders;
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gallerySlidersSlice = createSlice({
  name: 'gallerySliders',
  initialState: {
    sliders: [],
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
      .addCase(fetchGallerySliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallerySliders.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = action.payload;
        state.error = null;
      })
      .addCase(fetchGallerySliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = gallerySlidersSlice.actions;
export default gallerySlidersSlice.reducer;