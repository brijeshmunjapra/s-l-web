import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching blog page content
export const fetchBlogPageContent = createAsyncThunk(
  'blogPage/fetchBlogPageContent',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const fullUrl = `${baseUrl}/api/content/page/blog`;

      console.log('Fetching blog page content from:', fullUrl);

      const response = await fetch(fullUrl);

      console.log('Blog page API response received, status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to fetch blog page content' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Blog page content response:', data);

      return data;
    } catch (error) {
      console.error('Blog page content fetch error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const blogPageSlice = createSlice({
  name: 'blogPage',
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
      .addCase(fetchBlogPageContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPageContent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchBlogPageContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = blogPageSlice.actions;
export default blogPageSlice.reducer;