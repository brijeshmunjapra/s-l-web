import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching about page content
export const fetchAboutPageContent = createAsyncThunk(
  'aboutPage/fetchAboutPageContent',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const fullUrl = `${baseUrl}/api/content/page/about`;

      console.log('Fetching about page content from:', fullUrl);

      const response = await fetch(fullUrl);

      console.log('About page API response received, status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch about page content' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('About page content response:', data);

      return data;
    } catch (error) {
      console.error('About page content fetch error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const aboutPageSlice = createSlice({
  name: 'aboutPage',
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
      .addCase(fetchAboutPageContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutPageContent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAboutPageContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = aboutPageSlice.actions;
export default aboutPageSlice.reducer;