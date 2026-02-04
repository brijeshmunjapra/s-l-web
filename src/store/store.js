import { configureStore } from '@reduxjs/toolkit';
import heroBannerReducer from './slices/heroBannerSlice';
import contactSubmissionReducer from './slices/contactSubmissionSlice';
import firstSectionReducer from './slices/firstSectionSlice';

export const store = configureStore({
  reducer: {
    heroBanner: heroBannerReducer,
    contactSubmission: contactSubmissionReducer,
    firstSection: firstSectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});