import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching how we started data
export const fetchHowWeStartedData = createAsyncThunk(
  'howWeStarted/fetchHowWeStartedData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev/api/about-us');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        // Only return data if active is true
        if (data.data.active === true) {
          return data.data;
        } else {
          return null; // Return null if not active
        }
      } else {
        throw new Error('Invalid API response structure');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const howWeStartedSlice = createSlice({
  name: 'howWeStarted',
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
      .addCase(fetchHowWeStartedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHowWeStartedData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchHowWeStartedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = howWeStartedSlice.actions;
export default howWeStartedSlice.reducer;