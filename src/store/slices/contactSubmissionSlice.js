import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Device ID utility functions
const generateDeviceId = () => {
  return 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const getDeviceId = () => {
  let deviceId = localStorage.getItem('contact_device_id');
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem('contact_device_id', deviceId);
  }
  return deviceId;
};

const getStoredSubmissionId = () => {
  return localStorage.getItem('contact_submission_id');
};

const storeSubmissionId = (id) => {
  localStorage.setItem('contact_submission_id', id);
};

// Async thunk for fetching existing contact submission for this device
export const fetchContactSubmission = createAsyncThunk(
  'contactSubmission/fetchContactSubmission',
  async (_, { rejectWithValue }) => {
    try {
      const submissionId = getStoredSubmissionId();
      if (!submissionId) {
        // No existing submission for this device
        return null;
      }

      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const fullUrl = `${baseUrl}/api/contact/${submissionId}`;

      console.log('Fetching existing contact submission for device:', fullUrl);

      const response = await fetch(fullUrl);
      console.log('Fetch GET response received, status:', response.status);

      if (response.status === 404) {
        // Submission not found, clear stored ID
        localStorage.removeItem('contact_submission_id');
        return null;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch contact submission');
      }

      const data = await response.json();
      console.log('Contact submission fetched:', data);

      return data;
    } catch (error) {
      console.error('Contact submission fetch error:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating or updating contact submission
export const submitContactForm = createAsyncThunk(
  'contactSubmission/submitContactForm',
  async (contactData, { rejectWithValue }) => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://ky3l1rp5ng.execute-api.ap-south-1.amazonaws.com/dev';
      const submissionId = getStoredSubmissionId();

      let method, fullUrl;

      if (submissionId) {
        // Update existing submission
        method = 'PUT';
        fullUrl = `${baseUrl}/api/contact/${submissionId}`;
        console.log('Updating existing contact submission:', submissionId, contactData);
      } else {
        // Create new submission
        method = 'POST';
        fullUrl = `${baseUrl}/api/contact`;
        console.log('Creating new contact submission:', contactData);
      }

      console.log('Full API URL:', fullUrl);

      const response = await fetch(fullUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      console.log(`Fetch ${method} response received, status:`, response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Failed to ${method === 'POST' ? 'create' : 'update'} contact form` }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Contact form ${method === 'POST' ? 'creation' : 'update'} response:`, data);

      // Store the submission ID for future updates
      if (method === 'POST' && data.id) {
        storeSubmissionId(data.id);
      }

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
    existingData: null,
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
      .addCase(fetchContactSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.existingData = action.payload;
        state.error = null;
      })
      .addCase(fetchContactSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.existingData = null;
      })
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action) => {
        state.loading = false;
        state.existingData = action.payload;
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