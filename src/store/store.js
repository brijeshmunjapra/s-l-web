import { configureStore } from '@reduxjs/toolkit';
import heroBannerReducer from './slices/heroBannerSlice';
import contactSubmissionReducer from './slices/contactSubmissionSlice';
import firstSectionReducer from './slices/firstSectionSlice';
import aboutPageReducer from './slices/aboutPageSlice';
import galleryPageReducer from './slices/galleryPageSlice';
import blogPageReducer from './slices/blogPageSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    heroBanner: heroBannerReducer,
    contactSubmission: contactSubmissionReducer,
    firstSection: firstSectionReducer,
    aboutPage: aboutPageReducer,
    galleryPage: galleryPageReducer,
    blogPage: blogPageReducer,
    reviews: reviewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});