import { configureStore } from '@reduxjs/toolkit';
import heroBannerReducer from './slices/heroBannerSlice';
import contactSubmissionReducer from './slices/contactSubmissionSlice';

export const store = configureStore({
  reducer: {
    heroBanner: heroBannerReducer,
    contactSubmission: contactSubmissionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});