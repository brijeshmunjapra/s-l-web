import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching first section data
export const fetchFirstSectionData = createAsyncThunk(
  'firstSection/fetchFirstSectionData',
  async (_, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const fullUrl = `${baseUrl}/api/second-section/all`;

      const response = await fetch(fullUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch first section data');
      }

      const data = await response.json();

      // Return the first item from the data array
      if (data.success && data.data && data.data.length > 0) {
        return data.data[0];
      } else {
        throw new Error('No data available');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const firstSectionSlice = createSlice({
  name: 'firstSection',
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
      .addCase(fetchFirstSectionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFirstSectionData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFirstSectionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = firstSectionSlice.actions;
export default firstSectionSlice.reducer;