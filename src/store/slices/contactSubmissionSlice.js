import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for creating new contact submission
export const submitContactForm = createAsyncThunk(
  'contactSubmission/submitContactForm',
  async (contactData, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_APP_WEB_URL_API || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const fullUrl = `${baseUrl}/api/contact`;

      console.log('Creating new contact submission:', contactData);
      console.log('Full API URL:', fullUrl);

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      console.log('Fetch POST response received, status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to create contact form' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Contact form creation response:', data);

      return data;
    } catch (error) {
      console.error('Contact form submission error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const contactSubmissionSlice = createSlice({
  name: 'contactSubmission',
  initialState: {
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
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = contactSubmissionSlice.actions;
export default contactSubmissionSlice.reducer;