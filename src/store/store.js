import { configureStore } from '@reduxjs/toolkit';
import heroBannerReducer from './slices/heroBannerSlice';
import contactSubmissionReducer from './slices/contactSubmissionSlice';
import firstSectionReducer from './slices/firstSectionSlice';
import fourthSectionReducer from './slices/fourthSectionSlice';
import seventhSectionReducer from './slices/seventhSectionSlice';
import howWeStartedReducer from './slices/howWeStartedSlice';
import galleryImagesReducer from './slices/galleryImagesSlice';
import gallerySlidersReducer from './slices/gallerySlidersSlice';
import blogCouplesReducer from './slices/blogCouplesSlice';
import aboutPageReducer from './slices/aboutPageSlice';
import galleryPageReducer from './slices/galleryPageSlice';
import blogPageReducer from './slices/blogPageSlice';
import reviewsReducer from './slices/reviewsSlice';

export const store = configureStore({
  reducer: {
    heroBanner: heroBannerReducer,
    contactSubmission: contactSubmissionReducer,
    firstSection: firstSectionReducer,
    fourthSection: fourthSectionReducer,
    seventhSection: seventhSectionReducer,
    howWeStarted: howWeStartedReducer,
    galleryImages: galleryImagesReducer,
    gallerySliders: gallerySlidersReducer,
    blogCouples: blogCouplesReducer,
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