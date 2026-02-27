import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching hero banner data
export const fetchHeroBanners = createAsyncThunk(
  'heroBanner/fetchHeroBanners',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_WEB_URL_API || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      console.log('Environment variables VITE_APP_WEB_URL_API:', import.meta.env.VITE_APP_WEB_URL_API);
      console.log('Using baseUrl:', baseUrl);

      const fullUrl = `${baseUrl}/api/hero-banner`;
      console.log('Full API URL:', fullUrl);

      console.log('Making fetch request to:', fullUrl);
      const response = await fetch(fullUrl);
      console.log('Fetch response received, status:', response.status);
      console.log('Fetch response ok:', response.ok);

      if (!response.ok) {
        throw new Error('Failed to fetch hero banners');
      }

      const data = await response.json();

      // Extract banners from nested structure: {success: true, data: {banners: [...]}}
      const banners = data.data?.banners || [];

      // Filter active banners and sort by displayOrder
      const activeBanners = banners
        .filter(banner => banner.active)
        .sort((a, b) => a.displayOrder - b.displayOrder);

      return activeBanners;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const heroBannerSlice = createSlice({
  name: 'heroBanner',
  initialState: {
    banners: [],
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
      .addCase(fetchHeroBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
        state.error = null;
      })
      .addCase(fetchHeroBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = heroBannerSlice.actions;
export default heroBannerSlice.reducer;